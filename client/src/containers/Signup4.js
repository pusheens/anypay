import React from 'react'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Camera from '../components/Camera'

export default class Signup4 extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Scan your card</h1>
        </div>
        <div className='flex-middle'>
          <Camera to='/signup5' />
        </div>
        <div className='flex-end is-centered'>
        </div>
      </div>
    )
  }
}
