import React, { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
  state = {
    board: [],
  }

  componentDidMount() {
    this.setState({ board: this.createBoard() });
  }

  createBoard = () => {
    let board = this.createEmptyBoard();
    board = this.plantMines(board);
    board = this.showHints(board);
    return board;
  }
  
  createEmptyBoard = () => {
    const { width, heigth } = this.props;
    const newBoard = [];
    for(let y = 0; y < heigth; y+= 1) {
      const boardRow = [];
      for(let x = 0; x < width; x+= 1) {
        boardRow.push(({
          x,
          y,
          isMine: false,
          isClicked: false,
          isFlagged: false,
          bombsAround: 0,
        }));
      }
      newBoard.push(boardRow);
    }
    return newBoard;
  }

  plantMines = (board) => {
    const { width, heigth, mines } = this.props;
    let plantedmines = 0;
    const minedBoard = [...board];
    while(plantedmines < Number(mines)) {
      const mineX = Math.floor(Math.random() * width);
      const mineY = Math.floor(Math.random() * heigth);
     
      if (!minedBoard[mineY][mineX].isMine) { 
        plantedmines += 1;
        minedBoard[mineY][mineX].isMine = true;
      }
    }
    return minedBoard;
  }

  showHints = (board) => {
    const { width, heigth } = this.props;
    const hintBoard = [...board];

    for (let posY = 0; posY < heigth; posY += 1) {
      for (let posX = 0; posX < width; posX += 1) {
        if (board[posX][posY].isMine) {
          const cellsAround = this.getCellsAround(board, board[posX][posY].y, board[posX][posY].x);
          cellsAround.forEach(({x, y}) => {
            hintBoard[y][x].bombsAround += 1;
          })
        }
      }  
    }

    return hintBoard;
  }

  getCellsAround = (board, posY, posX) => {
    const { width, heigth } = this.props;

    const cellsAround = [];
    // Top Left
    if (posY > 0 && posX > 0) {
      cellsAround.push(board[posY - 1][posX - 1]);
    }

    // Top Center
    if (posY > 0) {
      cellsAround.push(board[posY - 1][posX]);
    }

    // Top Right
    if (posY > 0 && posX < width - 1) {
      cellsAround.push(board[posY - 1][posX + 1]);
    }

    // Left
    if (posX > 0) {
      cellsAround.push(board[posY][posX - 1]);
    }

    // Right
    if (posX < width - 1) {
      cellsAround.push(board[posY][posX + 1]);
    }

    // Bottom Left
    if (posY < heigth - 1 && posX > 0) {
      cellsAround.push(board[posY + 1][posX - 1]);
    }

    // Bottom
    if (posY < heigth - 1) {
      cellsAround.push(board[posY + 1][posX]);
    }

    // Bottom Right
    if (posY < heigth - 1 && posX < width - 1) {  
      cellsAround.push(board[posY + 1][posX + 1]);
    }

    return cellsAround;
  }

  revealEmpty(y, x, board) {
    const cellsAround = this.getCellsAround(board, y, x)
    cellsAround.forEach((cell) => {
      if (!cell.isClicked && (cell.bombsAround === 0 || !cell.isMine)) {
        board[cell.y][cell.x].isClicked = true;
        if (cell.bombsAround === 0) {
          this.revealEmpty(cell.y, cell.x, board);
        }
      }
    });
    return board;
  }

  cellClick = (posY, posX) => {
    const { board } = this.state;
    let updatedBoard = [...board];

    updatedBoard[posY][posX].isClicked = true;

    if(updatedBoard[posY][posX].bombsAround === 0 && !updatedBoard[posY][posX].isMine) {
      updatedBoard = this.revealEmpty(posY, posX, updatedBoard);
    }

    this.setState({
      board: updatedBoard,
    })
  }

  render() {
    const { board } = this.state;
    return board.map((boardRow, index) => (
      <div className="board-row" key={`row-${index}`}>
        { boardRow.map((cell, rowIndex) =>(
          <Cell key={`row-${index}-${rowIndex}`} {...cell} onClick={ this.cellClick }/>
        ) ) }
      </div>
    ))
  }
}
