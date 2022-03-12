import React, { Component } from 'react'

export default class Cell extends Component {
  render() {
    const { isMine, bombsAround } = this.props;
    console.log(bombsAround);
    return (
      isMine ? <button>B</button> : <button>{ bombsAround }</button>
    )
  }
}
