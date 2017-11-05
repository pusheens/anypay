import React from 'react'

import Button from '../components/Button'
import Input from '../components/Input'

export default class AddBankAccount extends React.Component {
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
          <Button to='/signup6' text='Add Bank Account' type='gradient' />
        </div>
      </div>
    )
  }
}
