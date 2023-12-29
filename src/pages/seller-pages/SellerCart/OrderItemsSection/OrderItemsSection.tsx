import React, { FC } from 'react';

import { OrderItemInCart } from './OrderItemInCart';
import { SupplierInformation } from './SupplierInformation';

import { DotIcon } from 'assets/icons';
import { IProductCardCart } from 'store/reducers/seller/cart';
import { Paragraph } from 'ui-kit';

import style from './OrderItemsSection.module.scss';

interface IOrderItemsSection {
  products: IProductCardCart[];
}

export const OrderItemsSection: FC<IOrderItemsSection> = ({ products }): JSX.Element => {
  return (
    <div className={style.order_items_details}>
      <div className={style.header_item}>
        <SupplierInformation products={products} />
      </div>

      <ul className={style.cart_list}>
        {products.map((item, index) => {
          return (
            <OrderItemInCart
              product={item.bundle_variation_pod.product}
              prices={item.bundle_variation_pod.prices}
              bundle_variation={item.bundle_variation_pod.bundle_variations[0]}
              amount={item.amount}
              is_checked={item.is_checked}
              key={index}
            />
          );
        })}
      </ul>

      <div className={style.track_info}>
        <Paragraph size="s2">Estimated delivery: 27.07.2022</Paragraph>
        <DotIcon />
        <Paragraph size="s2">Delivery method: Abra Shipment</Paragraph>
      </div>
    </div>
  );
};
