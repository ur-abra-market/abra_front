import React, { FC } from 'react';

import style from './CartOrder.module.scss';

import { Button } from 'ui-kit';

interface CartOrderProps {
  info: any;
}
const CartOrder: FC<CartOrderProps> = ({ info }) => {
  return (
    <div className={style.container}>
      <div className={style.items}>
        <p>Items to Order</p>
        <p>{info.items}</p>
      </div>
      <div className={style.price}>
        <p>Goods Cost</p>
        <p>${info.goodsCost}</p>
      </div>
      <div className={style.shipping}>
        <p>Shipping~</p>
        <p>${info.shipping}</p>
      </div>
      <p className={style.text_small}>
        * The final cost will be calculated after you add an address
      </p>
      <hr className={style.hr} />
      <div className={style.total}>
        <p>Total</p>
        <p>${info.totalCost}</p>
      </div>
      <Button className={style.button}>Checkout</Button>
      <p className={style.info}>
        Make sure that the quantity of goods and the selected characteristics are correct.
      </p>
    </div>
  );
};

export default CartOrder;
