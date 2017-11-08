import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'
import withUser from './withUser'
import api from '../lib/api'

class Signup6 extends React.Component {
  save = async () => {
    await axios.post(`${api}/card`, { 
      number: this.props.match.params.number
    }, {
      headers: {
        'token': await this.props.user.record.getIdToken(true)
      }
    })
  }
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Enter billing info</h1>
        </div>
        <div className='flex-middle is-centered'>
          <Input id='address' label='Address' type='text' focus />
          <Input id='zipcode' label='Zipcode' type='text' />
          <Input id='city' label='City' type='text' />
          <Input id='state' label='State' type='text' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/home' text='Save Account' type='gradient' onClick={this.save} />
          <Anchor to='/signup5' text='Go back' />
        </div>
      </div>
    )
  }
}

export default withRouter(withUser(Signup6))
