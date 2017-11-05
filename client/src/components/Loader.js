import React from 'react'
import ReactDOM from 'react-dom'

class Loader extends React.Component {
  render () {
    return (
      <div className='loader-container'>
        <div className="loader"></div>
      </div>
    )
  }
}

export function openLoader () {
  ReactDOM.render(<Loader />, document.getElementById('loader'))
  return () => ReactDOM.unmountComponentAtNode(document.getElementById('loader'))
}
