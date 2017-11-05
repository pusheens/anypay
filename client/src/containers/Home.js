import React from 'react'

import axios from 'axios'
import firebase from 'firebase'

import Button from '../components/Button'
import Profile from '../components/Profile'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      photoUrl: null,
      bankFlag: null,
      cardNumber: null
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      })
    })
    if (firebase.auth().currentUser) {
      this.setState({
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        photoUrl: firebase.auth().currentUser.photoURL
      })
    }
  }

  render () {
    const numAccounts = 2
    const balance = '0.00'

    return (
      <div className='container'>
        <div className='flex-start'>
          <div className='splash'>
            <Profile title={this.state.name} subtitle={this.state.email} img={this.state.photoUrl} />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <span className='text-oversized'>${balance}</span>
          { this.state.bankFlag === true ?
            <Button to='' text='Claim Rewards' type='primary' />
          :
            <Button to='/bankAccount' text='Add Bank Account' type='primary' />
          }
        </div>
        <div className='flex-end is-centered'>
          { this.state.cardNumber ?
            <Button to='/sendmoney1' text='Send Money' type='gradient' />
          :
            <Button to='/creditCard' text='Add Credit Card' type='gradient' />
          }
        </div>
      </div>
    )
  }
}
