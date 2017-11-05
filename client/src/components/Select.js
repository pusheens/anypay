import React from 'react'

export default class Select extends React.Component {
  constructor (props) {
    super(props)

    this.state = { id: this.props.id }
  }

  handleChange () {
    const select = document.getElementById(this.state.id)

    if (select.value === 'default') {
      select.className = 'unselected'
    } else {
      select.className = ''
    }
  }

  render () {
    const { id, label, options } = this.props

    return (
      <div className='input-group'>
        <div className='has-float-label'>
          <select id={id} name={id} className='unselected' onChange={this.handleChange.bind(this)}>
            <option value='default'></option>
            { options !== undefined ?
              options.map((option, i) => {
                return <option key={i} value={option.value}>{option.text}</option>
              })
            : null }
          </select>
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
}
