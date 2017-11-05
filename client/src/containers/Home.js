import React from 'react'

import Button from '../components/Button'
import Profile from '../components/Profile'

export default class Home extends React.Component {
  render () {
    const numAccounts = 2
    const balance = '20.00'

    return (
      <div className='container'>
        <div className='flex-start'>
          <div className='splash'>
            <Profile title='Nick Breaton' subtitle={`${numAccounts} Linked Accounts`} />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <span className='text-oversized'>${balance}</span>
          <Button to='' text='Claim Rewards' type='dark' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/sendmoney1' text='Send Money' type='gradient' />
        </div>
      </div>
    )
  }
}
