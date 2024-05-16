import React, { JSX } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { AddressAdder } from './AdressAdder/AdressAdder';
import { PaymentMethodAdder } from './PaymentMethodAdder/PaymentMethodAdder';

import { LockIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { OrderDetails } from 'pages/seller-pages/SellerCart/CartWithOrder/OrderDetails';
import { OrderItemsSection } from 'pages/seller-pages/SellerCart/CartWithOrder/OrderItemsSection';
import { CHECKOUT_SUCCESS } from 'routes';
import { productsInCart } from 'store/reducers/seller/cart';
import { isLoading } from 'store/reducers/seller/cart/selectors';
import { checkoutOrder } from 'store/reducers/seller/cart/thunks';
import { ButtonQuestion, LoaderLinear, Paragraph } from 'ui-kit';

import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const productsCart = useAppSelector(productsInCart);
  const cartIsLoading = useAppSelector(isLoading);
  const navigate = useNavigate();

  const ordersId = productsCart
    .flat()
    .filter(el => el.isChecked)
    .map(el => el.order_id);

  const checkedProductsCart = productsCart
    .map(products => products.filter(product => product.isChecked))
    .filter(products => products.length > 0);

  const handlePlaceOrder = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-syntax
    for await (const id of ordersId) {
      if (id) await dispatch(checkoutOrder(id));
    }
    navigate(CHECKOUT_SUCCESS);
  };

  if (cartIsLoading) return <LoaderLinear />;

  return (
    <div className={styles.container}>
      <div className={styles.main_content}>
        <div className={styles.left_column}>
          <AddressAdder />
          <PaymentMethodAdder />

          <div className={styles.order_info}>
            <span className={styles.order_title}>Items to Order</span>

            {checkedProductsCart.map((products, index) => (
              <OrderItemsSection isCheckoutPage products={products} key={index} />
            ))}
          </div>
        </div>
        <div className={styles.right_column}>
          <OrderDetails
            handleButton={handlePlaceOrder}
            additionalClassName={styles.order}
            isCheckoutPage
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
};
