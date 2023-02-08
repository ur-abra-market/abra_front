import React, { FC } from 'react';

import style from './CartOrder.module.css';

interface CartOrderProps {
  info: any;
}
const CartOrder: FC<CartOrderProps> = ({ info }) => {
  return (
    <div className={style.cartOrder}>
      <div className={style.cartOrder__items}>
        <p>Items to Order</p>
        <p>{info.items}</p>
      </div>
      <div className={style.cartOrder__price}>
        <p>Goods Cost</p>
        <p>${info.goodsCost}</p>
      </div>
      <div className={style.cartOrder__shipping}>
        <p>Shipping~</p>
        <p>${info.shipping}</p>
      </div>
      <p className={style.cartOrder__text_small}>
        * The final cost will be calculated after you add an address
      </p>
      <hr className={style.cartOrder__hrLine} />
      <div className={style.cartOrder__total}>
        <p>Total</p>
        <p>${info.totalCost}</p>
      </div>
      <button className={style.cartOrder__button}>Checkout</button>
      <p className={style.cartOrder__text_info}>
        Make sure that the quantity of goods and the selected characteristics are correct.
      </p>
    </div>
  );
};

export default CartOrder;
