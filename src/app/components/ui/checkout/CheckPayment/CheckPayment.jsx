import React from 'react'
import { useDispatch } from 'react-redux';
import { payment } from '../../../../store/reducers/modalSlice';
import './CheckPayment.css'

const CheckPayment = () => {
  const dispatch = useDispatch(); 
  return (
    <div className='CheckPayment'>      
      <div className='CheckPayment__block'>
        <h4>Payment Method</h4>
        <div className='CheckPayment__block_kind'>
          <div className='CheckPayment__block_kind-box'></div>
          <div className='CheckPayment__block_kind-cart'></div>
        </div>
      </div>
      <div className='CheckPayment_add' onClick={() => dispatch(payment(true))}>+ Add a credit or debit card</div>      
    </div>
  )
}

export default CheckPayment