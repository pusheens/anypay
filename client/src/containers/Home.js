import React from 'react'

import axios from 'axios'
import firebase from 'firebase'

import Button from '../components/Button'
import Profile from '../components/Profile'

import withUser from './withUser'

class Home extends React.Component {
  render () {
    const { record, data } = this.props.user
    return (
      <div className='container'>
        <div className='flex-start'>
          <div className='splash'>
            <Profile title={record.displayName} subtitle={record.email} img={record.photoURL} />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <span className='text-oversized'>${data.balance && data.balance.toFixed(2)}</span>
          { data.hasBank ?
            <Button to='' text='Claim Rewards' type='primary' />
          :
            <Button to='/bankAccount' text='Add Bank Account' type='primary' />
          }
        </div>
        <div className='flex-end is-centered'>
          { data.cardNumber ?
            <Button to='/sendmoney1' text='Send Money' type='gradient' />
          :
            <Button to='/creditCard' text='Add Credit Card' type='gradient' />
          }
        </div>
      </div>
    )
  }
}

export default withUser(Home)