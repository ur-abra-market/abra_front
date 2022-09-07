import React from 'react'
import './Address.css'

const Address = ({isMain}) => {
  const style = {
    background: isMain ? '#f2f2f2' : '#ffffff',
    border: isMain ? '2px #000000 solid' : '2px #d6d6d6 solid'
  }

  return (
    <div className='Address' style={style}>
      <div className='Address__content'>
        <div className='Address__content-text'>{'firstName'} {'lastName'}, {'phone'}</div>
        <div className='Address__content-edit' />
      </div>
      <div className='Address_place'>{'street'}, {'apartment'}, {'city'}, {'region'}, {'state'}, {'country'}, {'zipcode'}</div>
      <div className='Address__main' style={{display: isMain ? 'flex' : 'none'}}>
        <div className='Address__main_text'>Main Address</div>
        <div className='Address__main_mark'/>
      </div>
    </div>
  )
}

export default Address