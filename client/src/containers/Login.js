import React from 'react'
import { withRouter } from 'react-router'

import Anchor from '../components/Anchor'
import Button from '../components/Button'
import Input from '../components/Input'
import Logo from '../components/Logo'

import firebase from 'firebase'

class Login extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/sendmoney1')
      }
    })
  }
  login = async event => {
    event.preventDefault()
    
    const email = this.refs.form.email.value
    const password = this.refs.form.password.value

    try {
      await firebase.auth().signInWithEmailAndPassword(
        email, password
      )
      this.props.history.push('/home')
    } catch (error) {
      console.log(error)
    }
  }
  render () {
    return (
      <form className='container' ref='form'>
        <div className='flex-start'>
          <div className='splash'>
            <Logo />
          </div>
        </div>
        <div className='flex-middle is-centered'>
          <Input id='email' label='Email' type='text' focus />
          <Input id='password' label='Password' type='password' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/home' text='Login' type='gradient' onClick={this.login} />
          <Anchor to='/signup1' text='Not registered? Click here' />
        </div>
      </form>
    )
  }
}

export default withRouter(Login)