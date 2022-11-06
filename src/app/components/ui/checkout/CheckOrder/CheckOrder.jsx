import React from 'react'
import style from './CheckOrder.module.css'

const CheckOrder = () => {
  return (
    <div className={style.checkOrder}>
      <div className={style.checkOrder__price}>
        <span>100pc</span>
        <span>................................</span>
        <span style={{ textDecoration: 'line-through' }}>$850</span>
        <span>$780</span>
      </div>
      <div className={style.checkOrder__shipping}>
        <span>Shipping~</span>
        <span>................................</span>
        <span>$220</span>
      </div>
      <div className={style.checkOrder__note}>
        * The final cost will be calculated after you add an address
      </div>
      <div className={style.checkOrder__total}>
        <div>Total</div>
        <div>$1000</div>
      </div>
      <div className={style.checkOrder__place}>Place Order</div>
      <div className={style.checkOrder__text}>
        Please make sure the information entered is correct before proceeding.
      </div>
      <div className={style.checkOrder__security}>
        <div className={style.checkOrder__security_lock} />
        <div className={style.checkOrder__security_text}>
          Your data and orders are secured
        </div>
      </div>
    </div>
  )
}

export default CheckOrder
