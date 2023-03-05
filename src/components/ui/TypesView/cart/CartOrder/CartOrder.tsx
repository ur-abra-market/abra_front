import React, { FC } from 'react'

import style from './CartOrder.module.css'

interface CartOrderProps {
  info: any
}
const CartOrder: FC<CartOrderProps> = ({ info }): JSX.Element => {
  return (
    <div className={style.cart_order}>
      <div className={style.cart_order_items}>
        <p>Items to Order</p>
        <p>{info.items}</p>
      </div>
      <div className={style.cart_order_price}>
        <p>Goods Cost</p>
        <p>${info.goodsCost}</p>
      </div>
      <div className={style.cart_order_shipping}>
        <p>Shipping~</p>
        <p>${info.shipping}</p>
      </div>
      <p className={style.cart_order_text_small}>
        * The final cost will be calculated after you add an address
      </p>
      <hr className={style.cart_order_hrLine} />
      <div className={style.cart_order_total}>
        <p>Total</p>
        <p>${info.totalCost}</p>
      </div>
      <button type="button" className={style.cart_order_button}>
        Checkout
      </button>
      <p className={style.cart_order_text_info}>
        Make sure that the quantity of goods and the selected characteristics
        are correct.
      </p>
    </div>
  )
}

export default CartOrder
