import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'

export default class Signup1 extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start'>&nbsp;</div>
        <div className='flex-middle is-centered'>
          <h1 className='text-centered'>Account created!</h1>
        </div>
        <div className='flex-end is-centered'>
          <Button to='/signup4' text='Add a Credit Card' type='gradient' />
          <Anchor to='/home' text='Skip for now' />
        </div>
      </div>
    )
  }
}
