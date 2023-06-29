import React, { FC } from 'react';

import style from './CartList.module.scss';

import ShopItem from 'old-components/ui/TypesView/cart/ShopItem/ShopItem';

interface CartListProps {
  cartItems?: any[];
}
const CartList: FC<CartListProps> = ({ cartItems }) => {
  return (
    <div className={style.cart_items}>
      <span className={style.title}>My Cart (3 Items)</span>
      {cartItems && cartItems.map(item => <ShopItem key={item.id} shopItem={item} />)}
    </div>
  );
};

export default CartList;
