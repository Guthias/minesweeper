import React, { Component } from 'react'
import { FaBomb, FaFlag } from 'react-icons/fa';

export default class Cell extends Component {
  
  hiddenBoardCell = () => {
    const {onClick, posY, posX} = this.props; 
    return (
      <button
        className="board-cell hide"
        onClick={ () => onClick(posY, posX)}
      />
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
