import React from 'react'
import './Address.css'

const Address = ({address}) => {  
  const style = {
    background: address.isMain ? '#f2f2f2' : '#ffffff',
    border: address.isMain ? '2px #000000 solid' : '2px #d6d6d6 solid'
  }
  const arrAddress = [address.street, address.apartment, address.city, address.region, address.state, address.country, address.zipcode];
  const arrFilter = arrAddress.filter((e) => e !== '');

  return (
    <div className='Address' style={style}>
      <div className='Address__content'>
        <div className='Address__content-text'>{address.firstname} {address.lastname}, {address.phone}</div>
        <div className='Address__content-edit' />
      </div>
      <div className='Address_place'>{arrFilter.join(', ')}</div>
      <div className='Address__main' style={{display: address.isMain ? 'flex' : 'none'}}>
        <div className='Address__main_text'>Main Address</div>
        <div className='Address__main_mark'/>
      </div>
    </div>
  )
}

export default Address