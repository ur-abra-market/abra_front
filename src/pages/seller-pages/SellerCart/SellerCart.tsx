import React, { useEffect, useState } from 'react';

import { OrderDetails } from './OrderDetails';
import { OrderItemInCart } from './OrderItemInCart';
import { SupplierInformation } from './SupplierInformation';

import { DotIcon } from 'assets/icons';
import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getProductById } from 'store/reducers/productSlice';
import {
  getAmount,
  getProductItemsInCart,
  getSellerDataCart,
  getTotalAmount,
  productCardInCart,
  totalItemsInCart,
} from 'store/reducers/seller/cart';
import { Checkbox, LoaderLinear, Paragraph, Title } from 'ui-kit';

import style from './SellerCart.module.scss';

export const SellerCartPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isFetchingData, setIsFetchingData] = useState(true);
  const productCart = useAppSelector(productCardInCart);
  const itemsInCart = useAppSelector(totalItemsInCart);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(getSellerDataCart({ offset: 1, limit: 10 }))
        .unwrap()
        .then(res => {
          const products = Object.values(res).map(product => {
            return product.details[0];
          });

          products.map(async product => {
            await dispatch(getProductById({ product_id: product.id }));
            await dispatch(
              getAmount({
                order_id: product.id,
                amount: product.amount,
              }),
            );
            await dispatch(getProductItemsInCart());
            await dispatch(getTotalAmount());
          });
        });

      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch]);

  if (isFetchingData) return <LoaderLinear />;

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.order_items}>
          <Title as="h1" weight="bold" className={style.title}>
            My Cart ({itemsInCart} Items)
          </Title>
          {productCart?.map((item: any) => {
            return (
              <div className={style.order_items_details} key={item.id}>
                <div className={style.header_item}>
                  <Checkbox
                    variant="default"
                    className={style.checkbox_header}
                    onClick={() => {}}
                  />
                  <SupplierInformation item={item} />
                </div>

                <ul className={style.cart_list}>
                  <OrderItemInCart item={item} />
                </ul>
                <div className={style.track_info}>
                  <Paragraph size="s2">Estimated delivery: 27.07.2022</Paragraph>
                  <DotIcon />
                  <Paragraph size="s2">Delivery method: Abra Shipment</Paragraph>
                </div>
              </div>
            );
          })}
        </div>
        <OrderDetails />
      </div>
    </div>
  );
});
