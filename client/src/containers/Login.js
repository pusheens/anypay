import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'
import Logo from '../components/Logo'

export default class Login extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start'>
          <div className='splash'>
            <Logo />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <Input id='username' label='Username' type='text' focus />
          <Input id='password' label='Password' type='password' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/home' text='Login' type='gradient' />
          <Anchor to='/signup1' text='Not registered? Click here' />
        </div>
      </div>
    )
  }
}
