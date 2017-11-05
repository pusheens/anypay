import React from 'react'

import Button from '../components/Button'

export default class SendMoney3 extends React.Component {
  render () {
    return (
      <div className='container gradient'>
        <div className='flex-start'>&nbsp;</div>
        <div className='flex-middle is-centered'>
          <h1 className='text-large'>Success!</h1>
        </div>
        <div className='flex-end is-centered'>
          <Button to='/home' text='Back to Home' type='light' />
        </div>
      </div>
    )
  }
}
