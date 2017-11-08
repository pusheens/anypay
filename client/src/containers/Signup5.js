import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'
import withUser from './withUser'

class Signup5 extends React.Component {
  render () {
    let name, cardNumber, expiration
    name = this.props.user.record.displayName
    cardNumber = Array(4).fill().map(() => 
      '' + Math.floor((Math.random() * 10))
         + Math.floor((Math.random() * 10))
         + Math.floor((Math.random() * 10))
         + Math.floor((Math.random() * 10))
    ).join(' ')
    expiration = '01/2019'

    return this.props.user.record.displayName ? (
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
          <Button to={`/signup6/${cardNumber}`} text='Next' type='gradient' />
          <Anchor to='/signup4' text='Go back' />
        </div>
      </div>
    ) : null
  }
}

export default withUser(Signup5)