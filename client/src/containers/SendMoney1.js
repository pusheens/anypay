import { withRouter } from 'react-router'
import axios from 'axios'
import React from 'react'

import Camera from '../components/Camera'
import { openLoader } from '../components/Loader'

class SendMoney1 extends React.Component {
  onSnap = async (snap) => {
    const closeLoader = openLoader()

    const formData = new FormData()
    const blob = await fetch(snap).then(res => res.blob())
    formData.append('photo', blob)

    const { data: { photoUrl, user } } = await axios.post('http://localhost:8080/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    closeLoader()

    if (user) {
      this.props.history.push(`/sendmoney2/${user}/${encodeURIComponent(photoUrl)}`)
    } else {
      alert('No match found. Try again.')
      window.location = window.location
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Take their photo</h1>
        </div>
        <div className='flex-middle'>
          <Camera onSnap={this.onSnap} />
        </div>
        <div className='flex-end is-centered'>&nbsp;</div>
      </div>
    )
  }
}

export default withRouter(SendMoney1)
