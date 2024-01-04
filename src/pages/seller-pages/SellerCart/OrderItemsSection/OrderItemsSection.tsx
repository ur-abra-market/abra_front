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
              key={index}
              product={item.bundle_variation_pod.product}
              prices={item.bundle_variation_pod.prices}
              bundle_variation={item.bundle_variation_pod.bundle_variations[0]}
              amount={item.amount}
              is_checked={item.is_checked}
            />
          );
        })}
      </ul>

      <div className={style.delivery_info}>
        <div className={style.delivery_time}>
          <Paragraph size="s2">
            Estimated delivery:
            <span> 27.07.2022</span>
          </Paragraph>
        </div>
        <DotIcon />
        <div className={style.delivery_method}>
          <Paragraph size="s2">
            Delivery method:
            <span> Abra Shipment</span>
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
