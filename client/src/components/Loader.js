import React from 'react'
import ReactDOM from 'react-dom'

class Loader extends React.Component {
  render () {
    return (
      <div className='phone-wrapper'>
        <div className='phone'>
          <div className='phone-content'>
            <div className='loader-container'>
              <div className="loader"></div>
            </div>
          </div>
        </div>
      </div>      
    )
  }
}

export function openLoader () {
  ReactDOM.render(<Loader />, document.getElementById('loader'))
  return () => ReactDOM.unmountComponentAtNode(document.getElementById('loader'))
}
