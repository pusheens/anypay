import React from 'react'
import { withRouter } from 'react-router'

class Camera extends React.Component {
  componentDidMount () {
    this.video = document.querySelector('#camera-stream')
    this.stream = null

    navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    )

    if (!navigator.getMedia) {
      console.log('Your browser doesn\'t have support for the navigator.getUserMedia interface.')
    } else {
      navigator.getMedia(
        {
          video: true
        },
        (stream) => {
          this.stream = stream
          this.video.src = window.URL.createObjectURL(stream)

          this.video.play()
          this.video.onplay = () => {
            this.showVideo()
          }
        },
        (err) => {
          console.log('There was an error with accessing the camera stream: ' + err.name, err)
        }
      )
    }
  }

  handleTakePhoto () {
    var snap = this.takeSnapshot()
    this.video.pause()

    if (snap !== '') {
      if (this.props.to) 
        this.props.history.push(this.props.to)
      if (this.props.onSnap) 
        this.props.onSnap(snap)
    }
    if (this.stream) {
      // stop camera
      this.stream.getTracks()[0].stop()
    }
  }

  takeSnapshot () {
    var hidden_canvas = document.querySelector('canvas'),
        context = hidden_canvas.getContext('2d')

    var width = this.video.videoWidth,
        height = this.video.videoHeight

    if (width && height) {
      hidden_canvas.width = width
      hidden_canvas.height = height

      context.drawImage(this.video, 0, 0, width, height)

      return hidden_canvas.toDataURL('image/png')
    }
  }

  showVideo () {
    this.video.classList.add('visible')
  }

  render () {
    return (
      <div className='camera'>
        <video muted id='camera-stream'></video>
        <span className='capture' onClick={this.handleTakePhoto.bind(this)}></span>
        <canvas></canvas>
      </div>
    )
  }
}

export default withRouter(Camera)
