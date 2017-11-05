import React from 'react'
import { Link } from 'react-router-dom'

export default class Button extends React.Component {
  render () {
    const { text, to, type, onClick } = this.props

    return (
      <Link to={to} className={`button ${type}`} onClick={onClick}>
        {text}
      </Link>
    )
  }
}
