import React, { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
  state = {
    board: [],
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard = () => {
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

    this.setState({ board: newBoard }, this.plantMines);
  }
  
  plantMines = () => {
    const { board } = this.state;
    const { width, heigth, mines } = this.props;
    let plantedmines = 0;

    while(plantedmines < Number(mines)) {
      const mineX = Math.floor(Math.random() * width);
      const mineY = Math.floor(Math.random() * heigth);
     
      if (!board[mineY][mineX].isMine) { 
        plantedmines += 1;
        board[mineY][mineX].isMine = true;
        console.log(mineY, mineX)
        this.giveHint(mineY, mineX);
      }
    }
  }

  giveHint = (mineY, mineX) => {
    const { board } = this.state;
    const { width, heigth } = this.props;
    // Top Left
    if (mineY > 0 && mineX < 0) {
      console.log( board[mineY - 1][mineX - 1]);
      board[mineY - 1][mineX - 1].bombsAround += 1;
    }

    // Top Center
    if (mineY > 0) {
      board[mineY - 1][mineX].bombsAround += 1;
    }

    // Top Right
    if (mineY > 0 && mineX < width - 1) {
      board[mineY][mineX].bombsAround += 1;
    }

    // Left
    if (mineX > 0) {
      board[mineY][mineX - 1].bombsAround += 1;
    }

    // Right
    if (mineX < width - 1) {
      board[mineY][mineX + 1].bombsAround += 1;
    }

    // Bottom Left
    if (mineY < heigth - 1 && mineX > 0) {
      board[mineY + 1][mineX - 1].bombsAround += 1;
    }

    // Bottom
    if (mineY < heigth - 1) {
      board[mineY + 1][mineX].bombsAround += 1;
    }

    // Bottom Right
    if (mineY < heigth - 1 && mineX < width - 1) {
      board[mineY + 1][mineX + 1].bombsAround += 1;
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
