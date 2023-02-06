import React, { FC } from 'react';

import ShopItem from '../ShopItem/ShopItem';

import style from './CartList.module.css';

interface CartListProps {
  cartItems?: any[];
}
const CartList: FC<CartListProps> = ({ cartItems }): JSX.Element => {
  return (
    <div className={style.cartItems}>
      <span className={style.cartItems__title}>My Cart (3 Items)</span>
      {cartItems && cartItems.map(item => <ShopItem key={item.id} shopItem={item} />)}
    </div>
  );
};

export default CartList;
