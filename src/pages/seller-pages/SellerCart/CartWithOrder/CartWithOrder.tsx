import React from 'react';

import { OrderDetails } from './OrderDetails';
import { OrderItemsSection } from './OrderItemsSection';

import { useAppSelector } from 'common/hooks';
import { productsInCart, totalItems } from 'store/reducers/seller/cart';
import { Title } from 'ui-kit';

import style from './CartWithOrder.module.scss';

export const CartWithOrder = (): JSX.Element => {
  const productsCart = useAppSelector(productsInCart);
  const totalAmountItems = useAppSelector(totalItems);

  return (
    <div className={style.content}>
      <div className={style.order_items}>
        <Title as="h1" weight="bold" className={style.title}>
          My Cart ({totalAmountItems} Items)
        </Title>

        {productsCart.map((products, index) => {
          return <OrderItemsSection products={products} key={index} />;
        })}
      </div>

      <OrderDetails />
    </div>
  );
};
