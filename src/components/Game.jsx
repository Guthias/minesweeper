import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  state = {
    width: 8,
    heigth: 8,
    mines: 10,
  }

  render() {
    const { width, heigth, mines } = this.state;

    return (
      <div className="game-area">
        <div className="board-area">
          <Board
            width={ width }
            heigth={ heigth }
            mines={ mines }
          />
        </div>
      </div>
    )
  }
}
