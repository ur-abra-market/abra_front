import React from 'react'
import './CheckOrder.css'

const CheckOrder = () => {
  return (
    <div className='CheckOrder'>
      <div className='CheckOrder__price'>
        <span>100pc</span>
        <span>................................</span>
        <span style={{textDecoration: 'line-through'}}>$850</span>
        <span>$780</span>
      </div>
      <div className='CheckOrder__shipping'>
        <span>Shipping~</span>
        <span>................................</span>
        <span>$220</span>
      </div>
      <div className='CheckOrder__note'>* The final cost will be calculated after you add an address</div>
      <div className='CheckOrder__total'>
        <div>Total</div>
        <div>$1000</div>
      </div>
      <div className='CheckOrder__place'>Place Order</div>
      <div className='CheckOrder__text'>Please make sure the information entered is correct before proceeding.</div>
      <div className='CheckOrder__security'>
        <div className='CheckOrder__security_lock' />
        <div className='CheckOrder__security_text'>Your data and orders are secured</div>
      </div>
    </div>
  )
}

export default CheckOrder