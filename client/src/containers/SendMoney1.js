import React from 'react'

import Button from '../components/Button'

export default class SendMoney1 extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Take their photo</h1>
        </div>
        <div className='flex-middle'>&nbsp;</div>
        <div className='flex-end is-centered'>
          <Button to='/sendmoney2' text='Continue' type='gradient' />
        </div>
      </div>
    )
  }
}
