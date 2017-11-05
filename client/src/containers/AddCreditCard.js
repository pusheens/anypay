import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'

export default class AddCreditCard extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Enter a card</h1>
        </div>
        <div className='flex-middle is-centered'>
          <Input id='name' label='Name' type='text' focus />
          <Input id='cardNumber' label='Card Number' type='text' />
          <Input id='expiration' label='Expiration Date' type='text' />
          <Input id='cvv' label='CVV Code' type='text' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/signup6' text='Next' type='gradient' />
          <Anchor to='/signup4' text='Go back' />
        </div>
      </div>
    )
  }
}
