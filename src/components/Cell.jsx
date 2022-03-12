import React, { Component } from 'react'

export default class Cell extends Component {
  render() {
    const { isMine, bombsAround } = this.props;
    return (
      isMine ? <button>B</button> : <button>{ bombsAround }</button>
    )
  }
}
