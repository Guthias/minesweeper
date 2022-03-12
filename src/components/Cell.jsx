import React, { Component } from 'react'

export default class Cell extends Component {
  render() {
    const { onClick, y: posY , x: posX, isClicked } = this.props;
    return (
      <button
        className={ isClicked ? 'board-cell' : 'board-cell hide'}
        onClick={ () => onClick(posY, posX)}>
      </button>
    )
  }
}
