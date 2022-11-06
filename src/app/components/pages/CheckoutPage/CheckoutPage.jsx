import React from 'react'
import CheckDelivery from '../../ui/checkout/CheckDelivery'
import CheckItems from '../../ui/checkout/CheckItems'
import CheckOrder from '../../ui/checkout/CheckOrder'
import CheckPayment from '../../ui/checkout/CheckPayment'
import AddressPopup from '../../ui/popup/AddressPopup'
import PaymentPopup from '../../ui/popup/PaymentPopup'
import style from './CheckoutPage.module.css'

const CheckoutPage = () => {
  return (
    <div className={style.checkoutPage}>
      <div className={style.checkout}>
        <CheckDelivery />
        <CheckPayment />
        <div className={style.checkout_items}>
          <CheckItems index="0" />
          <CheckItems index="1" />
        </div>
      </div>
      <CheckOrder />
      <AddressPopup />
      <PaymentPopup />
    </div>
  )
}

export default CheckoutPage
