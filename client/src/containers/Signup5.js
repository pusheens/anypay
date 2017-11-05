import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'

export default class Signup5 extends React.Component {
  render () {
    let name, cardNumber, expiration
    name = 'Nick Breaton'
    cardNumber = '0000 0000 0000 0000'
    expiration = '00/0000'

    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Confirm your card</h1>
        </div>
        <div className='flex-middle is-centered'>
          <Input id='name' label='Name' type='text' value={name} />
          <Input id='cardNumber' label='Card Number' type='text' value={cardNumber} />
          <Input id='expiration' label='Expiration Date' type='text' value={expiration} />
          <Input id='cvv' label='CVV Code' type='text' focus />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/signup6' text='Next' type='gradient' />
          <Anchor to='/signup4' text='Go back' />
        </div>
      </div>
    )
  }
}
