import React from 'react'
import { useDispatch } from 'react-redux';
import { address } from '../../../../store/reducers/modalSlice';
import './CheckDelivery.css'

const CheckDelivery = () => {
  const dispatch = useDispatch(); 
  return (
    <div className='CheckDelivery'>
      <h4>Delivery Address</h4>
      <div className='CheckDelivery_add' onClick={() => dispatch(address(true))}>+ Add an address</div>
    </div>
  )
}

export default CheckDelivery