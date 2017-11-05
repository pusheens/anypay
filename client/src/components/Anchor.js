import React from 'react'
import { Link } from 'react-router-dom'

export default class Anchor extends React.Component {
  render () {
    const { text, to } = this.props

    return <Link to={to} className={`link`}>{text}</Link>
  }
}
