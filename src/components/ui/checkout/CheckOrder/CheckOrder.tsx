import React from 'react'

import style from './CheckOrder.module.css'

const CheckOrder = (): JSX.Element => {
  return (
    <div className={style.check_order}>
      <div className={style.check_order_price}>
        <span>100pc</span>
        <span>................................</span>
        <span style={{ textDecoration: 'line-through' }}>$850</span>
        <span>$780</span>
      </div>
      <div className={style.check_order_shipping}>
        <span>Shipping~</span>
        <span>................................</span>
        <span>$220</span>
      </div>
      <div className={style.check_order_note}>
        * The final cost will be calculated after you add an address
      </div>
      <div className={style.check_order_total}>
        <div>Total</div>
        <div>$1000</div>
      </div>
      <div className={style.check_order_place}>Place Order</div>
      <div className={style.check_order_text}>
        Please make sure the information entered is correct before proceeding.
      </div>
      <div className={style.check_order_security}>
        <div className={style.check_order_security_lock} />
        <div className={style.check_order_security_text}>
          Your data and orders are secured
        </div>
      </div>
    </div>
  )
}

export default CheckOrder
