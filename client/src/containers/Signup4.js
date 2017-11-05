import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'

export default class Signup4 extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Scan your card</h1>
        </div>
        <div className='flex-middle'>&nbsp;</div>
        <div className='flex-end is-centered'>
          <Button to='/signup5' text='Continue' type='gradient' />
          <Anchor to='/signup3' text='Go back' />
        </div>
      </div>
    )
  }
}
