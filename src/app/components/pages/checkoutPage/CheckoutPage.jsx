import React from 'react'
import CheckDelivery from '../../ui/checkout/CheckDelivery'
import CheckItems from '../../ui/checkout/CheckItems'
import CheckOrder from '../../ui/checkout/CheckOrder'
import CheckPayment from '../../ui/checkout/CheckPayment'
import './CheckoutPage.css'

const CheckoutPage = () => {
  return (
    <div className='CheckoutPage'>
      <div className='Checkout'>
        <CheckDelivery />
        <CheckPayment />
        <div className='Checkout_items'>          
          <CheckItems index='0'/>
          <CheckItems index='1'/>
        </div>
      </div>
      <CheckOrder />
    </div>
  )
}

export default CheckoutPage