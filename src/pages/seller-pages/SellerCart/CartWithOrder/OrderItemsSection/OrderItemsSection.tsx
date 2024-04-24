import React, { FC } from 'react';

import { DeliveryInformation } from './DeliveryInformation';
import { ItemsInCart } from './ItemsInCart';
import { SupplierInformation } from './SupplierInformation';

import { IProductCardInCart } from 'store/reducers/seller/cart';

import style from './OrderItemsSection.module.scss';

interface IOrderItemsSection {
  products: IProductCardInCart[];
  isCheckoutPage?: boolean;
}

export const OrderItemsSection: FC<IOrderItemsSection> = ({
  products,
  isCheckoutPage,
}): JSX.Element => {
  return (
    <div className={style.order_items_details}>
      <SupplierInformation isCheckoutPage={isCheckoutPage} products={products} />

      <ul className={style.cart_list}>
        <ItemsInCart isCheckoutPage={isCheckoutPage} products={products} />
      </ul>

      <DeliveryInformation />
    </div>
  );
};
