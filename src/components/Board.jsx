import React, { Component } from 'react'

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
      }
    }
  }

  render() {

    return (
      <div>Board</div>
    )
  }
}
