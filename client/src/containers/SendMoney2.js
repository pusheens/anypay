import React from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'

import Button from '../components/Button'
import Input from '../components/Input'
import Profile from '../components/Profile'
import Select from '../components/Select'
import withUser from './withUser'
import api from '../lib/api'

class SendMoney2 extends React.Component {
  sendMoney = async (event) => {
    const { receiver } = this.props.match.params
    const { value } = this.refs.form.amount

    await axios.post(`${api}/send`, { amount: value, receiver }, {
      headers: {
        'token': await this.props.user.record.getToken(true)
      }
    })
  }
  render () {
    const { photoUrl } = this.props.match.params
    const { creditCards } = this.props.user.data

    const accounts = !creditCards 
      ? [] 
      : Object.values(creditCards).map((number, i) => (
        { value: i + 1, text: '**** **** **** ' + number.substring(15, 20) }
      ))

    return (
      <form className='container' ref='form'>
        <div className='flex-start is-centered'>
          <Profile bgClass='on-white' sizeClass='large' img={decodeURIComponent(photoUrl)} />
        </div>
        <div className='flex-middle'>
          <Input id='amount' label='Amount' type='text' focus />
          <Select id='account' label='From Account' options={accounts} />
          <Input id='cvv' label='CVV Code' type='text' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/sendmoney3' text='Send' type='gradient' onClick={this.sendMoney} />
        </div>
      </form>
    )
  }
}

export default withRouter(withUser(SendMoney2))