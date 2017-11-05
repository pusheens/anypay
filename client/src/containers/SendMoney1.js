import React from 'react'
import axios from 'axios'

import Camera from '../components/Camera'

export default class SendMoney1 extends React.Component {
  onSnap = async (snap) => {
    // const binary = snap.replace(/^data:image\/(png|jpg);base64,/, "")
    const formData = new FormData()
    const blob = await fetch(snap).then(res => res.blob())
    formData.append('photo', blob)
    
    const { data } = await axios.post('http://localhost:3000/detect_face', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(data)
  }
  render () {
    return (
      <div className='container'>
        <div className='flex-start is-centered'>
          <h1>Take their photo</h1>
        </div>
        <div className='flex-middle'>
          <Camera to='/sendmoney2' onSnap={this.onSnap} />
        </div>
        <div className='flex-end is-centered'>&nbsp;</div>
      </div>
    )
  }
}
