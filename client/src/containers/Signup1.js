import React from 'react'
import { withRouter } from 'react-router'

import Button from '../components/Button'
import Input from '../components/Input'
import Profile from '../components/Profile'

import axios from 'axios'
import firebase from 'firebase'

class Signup1 extends React.Component {
  signup = async (event) => {
    event.preventDefault();
    
    const { data: { token } } = await axios.post('http://localhost:3000/signup', {
      data: {
        email: this.refs.container.email.value
      }
    })

    await firebase.auth().signInWithCustomToken(token)

    this.props.history.push('/signup2')
  }
  render () {
    return (
      <form className='container' ref='container'>
        <div className='flex-start'>&nbsp;</div>
        <div className='flex-middle is-centered'>
          <Profile bgClass='on-white' />
          <Input id='email' label='Email' type='email' focus />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/signup2' text='Continue' type='gradient' onClick={this.signup} />
        </div>
      </form>
    )
  }
}

export default withRouter(Signup1)