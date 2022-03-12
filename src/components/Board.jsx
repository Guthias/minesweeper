import React, { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
  state = {
    board: [],
  }

  componentDidMount() {
    console.log(this.createBoard());
  }

  createBoard = () => {
    let board = this.createEmptyBoard();
    board = this.plantMines(board);
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

  getCellsAround = (board, mineY, mineX) => {
    const { width, heigth } = this.props;

    // Top Left
    if (mineY > 0 && mineX > 0) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY - 1][mineX - 1].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Top Center
    if (mineY > 0) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY - 1][mineX].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Top Right
    if (mineY > 0 && mineX < width - 1) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY - 1][mineX + 1].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Left
    if (mineX > 0) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY][mineX - 1].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Right
    if (mineX < width - 1) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY][mineX + 1].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Bottom Left
    if (mineY < heigth - 1 && mineX > 0) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY + 1][mineX - 1].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Bottom
    if (mineY < heigth - 1) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY + 1][mineX].bombsAround += 1;
        return { board: updateBoard }
      });
    }

    // Bottom Right
    if (mineY < heigth - 1 && mineX < width - 1) {
      this.setState((prevState) => {
        const updateBoard = [...prevState.board];
        updateBoard[mineY + 1][mineX + 1].bombsAround += 1;
        return { board: updateBoard }
      });
    }
  }

  render() {
    const { board } = this.state;
    return board.map((boardRow, index) => (
      <div key={`row-${index}`}>
        { boardRow.map((cell, rowIndex) => <Cell key={`row-${index}-${rowIndex}`} {...cell} /> ) }
      </div>
    ))
  }
}
