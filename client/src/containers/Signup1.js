import React from 'react'
import { withRouter } from 'react-router'

import Button from '../components/Button'
import Input from '../components/Input'
import Profile from '../components/Profile'
import { openLoader } from '../components/Loader'

import axios from 'axios'
import firebase from 'firebase'

class Signup1 extends React.Component {
  state = {
    image: null
  }
  takePhoto = async (event) => {
    this.blob = event.target.files[0]
    var reader = new FileReader()

    reader.addEventListener('load', () => {
          this.setState({ image: reader.result })
    }, false)

    if (this.blob) {
      reader.readAsDataURL(this.blob)
    }
  }
  signup = async (event) => {
    event.preventDefault();
    this.closeLoader = openLoader()
    
    try {
      const formData = new FormData()
      
      formData.append('email', this.refs.container.email.value)
      formData.append('name', this.refs.container.fullname.value)
      formData.append('photo', this.blob)
      
      const { data: { token } } = await axios.post('http://localhost:8080/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
      const user = await firebase.auth().signInWithCustomToken(token)
      await user.updatePassword(this.refs.container.password.value)
      this.closeLoader()
      this.props.history.push('/signup3')
    } catch (error) {
      console.log(error)
      this.closeLoader()
    }
  }
  render () {
    return (
      <form className='container' ref='container'>
        <div className='flex-start'>&nbsp;</div>
        <div className='flex-middle is-centered'>
          <Profile bgClass='on-white' img={this.state.image}>
            <input onChange={this.takePhoto} type="file" accept="image/*" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10000,
              opacity: 0
            }}/>
          </Profile>
          <Input id='fullname' label='Full Name' type='text' focus />
          <Input id='email' label='Email' type='email' />
          <Input id='password' label='Password' type='password' />
        </div>
        <div className='flex-end is-centered'>
          <Button to='/signup3' text='Continue' type='gradient' onClick={this.signup} />
        </div>
      </form>
    )
  }
}

export default withRouter(Signup1)
