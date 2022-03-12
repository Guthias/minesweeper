import React, { Component } from 'react'
import { FaBomb, FaFlag } from 'react-icons/fa';

export default class Cell extends Component {
  
  hiddenBoardCell = () => {
    const {onClick, addFlag, posY, posX, isFlagged} = this.props; 
    return (
      <button
        className="board-cell hide"
        onClick={ () => onClick(posY, posX) }
        onContextMenu={ (event) => addFlag(event, posY, posX) }
      >
        { isFlagged && <FaFlag /> }
      </button>
    )
  }

  revealedBoardCell = () => {
    const { bombsAround, isMine } = this.props;
    let cellValue = bombsAround === 0 ? null : bombsAround;

    if (isMine) {
      cellValue = <FaBomb />
    }
    return (
      <button className="board-cell"> { cellValue } </button>
    )
  }

  render() {
    const { isClicked } = this.props;
    return (
      isClicked ? this.revealedBoardCell() : this.hiddenBoardCell()
    )
  }
}
