import React from 'react'
import { withRouter } from 'react-router'

import Button from '../components/Button'
import Input from '../components/Input'
import Profile from '../components/Profile'
import Select from '../components/Select'
import withUser from './withUser'

class SendMoney2 extends React.Component {
  render () {
    const { photoUrl } = this.props.match.params
    const { creditCards } = this.props.user.data

    const accounts = !creditCards 
      ? [] 
      : Object.values(creditCards).map((number, i) => (
        { value: i + 1, text: '**** **** **** ' + number.substring(15, 20) }
      ))

    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <Profile bgClass='on-white' sizeClass='large' img={decodeURIComponent(photoUrl)} />
        </div>
        <div className='flex-middle'>
          <Input id='amount' label='Amount' type='text' focus />
          <Select id='account' label='From Account' options={accounts} />
          <Input id='cvv' label='CVV Code' type='text' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/sendmoney3' text='Send' type='gradient' />
        </div>
      </div>
    )
  }
}

export default withRouter(withUser(SendMoney2))