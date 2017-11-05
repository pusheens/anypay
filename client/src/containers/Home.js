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
      photoUrl: null
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 
        name: user.displayName,
        photoUrl: user.photoURL
      })      
    })    
    if (firebase.auth().currentUser) {
      this.setState({ 
        name: firebase.auth().currentUser.displayName,
        photoUrl: firebase.auth().currentUser.photoURL
      })      
    }
      //const user2 = await axios.get(`http://localhost:3000/user_info?email=${user.email}`)
    
  }
  
  render () {
    const numAccounts = 2
    const balance = '20.00'

    return (
      <div className='container'>
        <div className='flex-start'>
          <div className='splash'>
            <Profile title={this.state.name} subtitle={`${numAccounts} Linked Accounts`} img={this.state.photoUrl} />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <span className='text-oversized'>${balance}</span>
          <Button to='' text='Claim Rewards' type='primary' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/sendmoney1' text='Send Money' type='gradient' />
        </div>
      </div>
    )
  }
}
