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
      cardNumber: null,
      balance: null
    }
  }

  async componentDidMount(){
    const  update = async (user) => {
      const { data } = await axios.get('http://204.84.8.253:3000/user_info', {
        params: {
          email: user.email
        }
      })

      this.setState({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        cardNumber: data.creditCards[0]
      })
    }

    await firebase.auth().onAuthStateChanged(async user => {
      await update(user)
    })
    if (firebase.auth().currentUser) {
      update(firebase.auth().currentUser)
    }
      //const user2 = await axios.get(`http://204.84.8.253:3000/user_info?email=${user.email}`)

  }

  render () {
    return (
      <div className='container'>
        <div className='flex-start'>
          <div className='splash'>
            <Profile title={this.state.name} subtitle={this.state.email} img={this.state.photoUrl} />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <span className='text-oversized'>${this.state.balance}.00</span>
          { this.state.bankFlag === 'true' ?
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
