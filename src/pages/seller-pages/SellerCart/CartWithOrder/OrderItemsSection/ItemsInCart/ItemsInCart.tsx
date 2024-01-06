import React, { FC } from 'react';

import { OrderItemInCart } from './OrderItemInCart';

import { IProductCardInCart } from 'store/reducers/seller/cart';

interface IItemsInCart {
  products: IProductCardInCart[];
}

export const ItemsInCart: FC<IItemsInCart> = ({ products }): JSX.Element => {
  return (
    <>
      {products.map((item, index) => {
        return (
          <OrderItemInCart
            key={index}
            product={item.bundle_variation_pod.product}
            prices={item.bundle_variation_pod.prices}
            bundle_variation={item.bundle_variation_pod.bundle_variations[0]}
            amount={item.amount}
            is_checked={item.is_checked}
          />
        );
      })}
    </>
  );
};
