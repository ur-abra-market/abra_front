import React, { JSX, useCallback, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { AddressAdder } from './AdressAdder/AdressAdder';
import { PaymentMethodAdder } from './PaymentMethodAdder/PaymentMethodAdder';

import { LockIcon } from 'assets/icons';
import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { OrderDetails } from 'pages/seller-pages/SellerCart/CartWithOrder/OrderDetails';
import { OrderItemsSection } from 'pages/seller-pages/SellerCart/CartWithOrder/OrderItemsSection';
import { getSellerCartData, productsInCart } from 'store/reducers/seller/cart';
import { isLoading } from 'store/reducers/seller/cart/selectors';
import { ButtonQuestion, LoaderLinear, Paragraph } from 'ui-kit';

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
            <span className={styles.order_title}>Items to Order</span>

            {productsCart.map((products, index) => (
              <OrderItemsSection isCheckoutPage products={products} key={index} />
            ))}
          </div>
        </div>
        <div className={styles.right_column}>
          <OrderDetails
            ordersId={ordersId as number[]}
            getCartData={getCartData}
            additionalClassName={styles.order}
          >
            <Paragraph size="s2" className={styles.order_security}>
              <LockIcon />
              Your data and orders are secured
            </Paragraph>
          </OrderDetails>
          <div className={styles.info_block}>
            By placing an order, you agree to the{' '}
            <Link to="/terms_and_conditions" className={styles.link}>
              Terms & Conditions
            </Link>{' '}
            of the service and the{' '}
            <Link to="/privacy_policy" className={styles.link}>
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>

      <ButtonQuestion />
    </div>
  );
}, 'additional');
