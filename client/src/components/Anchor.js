import React from 'react'
import { Link } from 'react-router-dom'

export default class Anchor extends React.Component {
  render () {
    const { text, to, onClick } = this.props

    return <Link to={to} className={`link`} onClick={onClick}>{text}</Link>
  }
}
