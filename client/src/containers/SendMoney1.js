import React from 'react'

import Camera from '../components/Camera'

export default class SendMoney1 extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Take their photo</h1>
        </div>
        <div className='flex-middle'>
          <Camera to='/sendmoney2' />
        </div>
        <div className='flex-end is-centered'>&nbsp;</div>
      </div>
    )
  }
}
