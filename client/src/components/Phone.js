import React from 'react'

export default ({ children }) => (
  <div className='phone-wrapper'>
    <div className='phone phone-image'>
      <div className='phone-content'>
        {children}
      </div>
    </div>
  </div>
)