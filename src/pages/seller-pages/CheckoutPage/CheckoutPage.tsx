import React, { JSX, useCallback, useEffect } from 'react';

import { AddressAdder } from './AdressAdder/AdressAdder';
import { PaymentMethodAdder } from './PaymentMethodAdder/PaymentMethodAdder';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { OrderDetails } from 'pages/seller-pages/SellerCart/CartWithOrder/OrderDetails';
import { OrderItemsSection } from 'pages/seller-pages/SellerCart/CartWithOrder/OrderItemsSection';
import { getSellerCartData, productsInCart } from 'store/reducers/seller/cart';
import { isLoading } from 'store/reducers/seller/cart/selectors';
import { ButtonQuestion, LoaderLinear } from 'ui-kit';

import styles from './CheckoutPage.module.scss';

export const CheckoutPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const productsCart = useAppSelector(productsInCart);
  const cartIsLoading = useAppSelector(isLoading);

  const getCartData = useCallback(async (): Promise<void> => {
    await dispatch(
      getSellerCartData({
        offset: 0,
        limit: 100,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    getCartData();
  }, [getCartData]);

  const ordersId = productsCart
    .flat()
    .filter(el => el.isChecked)
    .map(el => el.order_id);

  if (cartIsLoading) return <LoaderLinear />;

  return (
    <div className={styles.container}>
      <div className={styles.main_content}>
        <div className={styles.left_column}>
          <AddressAdder />
          <PaymentMethodAdder />

          <div className={styles.order_info}>
            <div className={styles.order_title}>Items to Order</div>

            {productsCart.map((products, index) => (
              <OrderItemsSection isCheckoutPage products={products} key={index} />
            ))}
          </div>
        </div>
        <OrderDetails ordersId={ordersId as number[]} getCartData={getCartData} />
      </div>

      <ButtonQuestion />
    </div>
  );
}, 'additional');
