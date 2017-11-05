import React from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import Logo from '../components/Logo'
import Profile from '../components/Profile'

export default class Signup1 extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start'>&nbsp;</div>
        <div className='flex-middle is-centered'>
          <Profile bgClass='on-white' />
          <Input id='email' label='Email' type='email' focus />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/signup2' text='Continue' type='gradient' />
        </div>
      </div>
    )
  }
}
