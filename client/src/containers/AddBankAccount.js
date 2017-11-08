import React from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import firebase from 'firebase'

import Button from '../components/Button'
import Input from '../components/Input'
import withUser from './withUser'
import api from '../lib/api'
import { openLoader } from '../components/Loader'

class AddBankAccount extends React.Component {
  addBank = async event => {
    event.preventDefault();
    const closeLoader = openLoader()
    try {
      await axios.post(`${api}/bank`, {}, {
        headers: {
          'token': await this.props.user.record.getToken(true)
        }
      })
      this.props.history.push('/home')
    } catch (error) {
      console.log(error)
    } finally {
      closeLoader()
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Enter bank info</h1>
        </div>
        <div className='flex-middle is-centered'>
          <Input id='bank' label='Banking Institution' type='text' focus />
          <Input id='routingNumber' label='Routing Number' type='text' />
          <Input id='accountNumber' label='Account Number' type='text' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/home' text='Add Bank Account' type='gradient' onClick={this.addBank} />
        </div>
      </div>
    )
  }
}

export default withUser(withRouter(AddBankAccount))