import React from 'react'

export default class Profile extends React.Component {
  render () {
    const { img, title, subtitle, bgClass, sizeClass } = this.props

    return (
      <div className={`profile ${bgClass} ${sizeClass}`} style={{ position: 'relative' }}>
        <span className='image' style={{ backgroundImage: `url('${img}')` }}></span>
        <h1 className='title'>{title}</h1>
        <h3 className='subtitle'>{subtitle}</h3>
        {this.props.children}
      </div>
    )
  }
}
