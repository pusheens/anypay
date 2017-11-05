import React from 'react'

export default class Input extends React.Component {
  render () {
    const { id, label, type, value, focus } = this.props

    return (
      <div className='input-group'>
        <div className='has-float-label'>
          <input id={id} type={type} name={id} placeholder='&nbsp;' defaultValue={value} autoFocus={focus} />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
}
