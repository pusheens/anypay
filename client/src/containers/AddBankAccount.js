import React from 'react'

import axios from 'axios'
import firebase from 'firebase'

import Button from '../components/Button'
import Input from '../components/Input'

export default class AddBankAccount extends React.Component {
  addBank = async event => {
    event.preventDefault()

    try {
      const email = firebase.auth().currentUser.email

      const { data } = await axios.post('http://localhost:3000/has_bank', {
        email,
        has_bank: true
      })

      this.props.history.push('/home')
    } catch (error) {
      console.log(error)
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
          <Button to='' text='Add Bank Account' type='gradient' />
        </div>
      </div>
    )
  }
}
