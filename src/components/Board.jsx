import React, { Component } from 'react'

export default class Board extends Component {
  state = {
    board: [],
  }

  componentDidMount() {
    this.setState({ board: this.createBoard() });
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

    return newBoard;
  }
  
  render() {

    return (
      <div>Board</div>
    )
  }
}
