import React from 'react'
import axios from 'axios'
import { format } from 'currency-formatter'

import Button from '../components/Button'
import Profile from '../components/Profile'
import withUser from './withUser'
import api from '../lib/api'
import { openLoader } from '../components/Loader'

class Home extends React.Component {
  claim = async event => {
    event.preventDefault()
    const closeLoader = openLoader()
    try {
      await axios.post(`${api}/claim`, {}, {
        headers: {
          'token': await this.props.user.record.getIdToken(true)
        }
      })
    } finally {
      closeLoader()
    }
  }
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
          <span className='text-oversized'>
            {format(data.balance || 0, { code: 'USD', precision: 0 })}
          </span>
          { data.hasBank ?
            <Button to='' text='Claim Rewards' type='primary' onClick={this.claim} />
          :
            <Button to='/bankAccount' text='Add Bank Account' type='primary' />
          }
        </div>
        <div className='flex-end is-centered'>
          { data.creditCards ?
            <Button to='/sendmoney1' text='Send Money' type='gradient' />
          :
            <Button to='/signup4' text='Add Credit Card' type='gradient' />
          }
        </div>
      </div>
    )
  }
}

export default withUser(Home)