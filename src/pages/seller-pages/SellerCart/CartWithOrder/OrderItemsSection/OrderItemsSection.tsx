import React, { FC } from 'react';

import { DeliveryInformation } from './DeliveryInformation';
import { ItemsInCart } from './ItemsInCart';
import { SupplierInformation } from './SupplierInformation';

import { IProductCardInCart } from 'store/reducers/seller/cart';

import style from './OrderItemsSection.module.scss';

interface IOrderItemsSection {
  products: IProductCardInCart[];
}

export const OrderItemsSection: FC<IOrderItemsSection> = ({ products }): JSX.Element => {
  return (
    <div className={style.order_items_details}>
      <SupplierInformation products={products} />

      <ul className={style.cart_list}>
        <ItemsInCart products={products} />
      </ul>

      <DeliveryInformation />
    </div>
  );
};
