import React from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { IProductCardInCart } from 'store/reducers/seller/cart';
import { productsInCart } from 'store/reducers/seller/cart/selectors';
import { checkoutOrder } from 'store/reducers/seller/cart/thunks';
import { Button, Paragraph, Title } from 'ui-kit';

import style from './OrderDetails.module.scss';

interface IOrderDetails {
  ordersId: number[];
  getCartData: () => void;
  children?: React.ReactNode;
  additionalClassName?: string;
  isCheckoutPage?: boolean;
}

export const OrderDetails = ({
  ordersId,
  getCartData,
  children,
  additionalClassName,
  isCheckoutPage,
}: IOrderDetails): JSX.Element => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productsInCart);
  const navigate = useNavigate();

  const selectedProducts = products
    .flat()
    .filter((item: IProductCardInCart) => item.isChecked);

  const totalValueItemsInOrder = selectedProducts.reduce(
    (item: number, product: IProductCardInCart) => {
      return item + product.amount;
    },
    0,
  );

  const totalPriceBundles = selectedProducts.reduce((previousValue, item) => {
    return (
      Number(previousValue.toFixed(2)) +
      Number((item.bundle_variation_pod.prices[0].value * item.amount).toFixed(2))
    );
  }, 0);

  const totalPriceBundlesToFixed = Number(totalPriceBundles.toFixed(2));

  const handleCheckout = (): void => {
    navigate('/checkout');
  };
  const handlePlaceOrder = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-syntax
    for await (const id of ordersId) {
      await dispatch(checkoutOrder(id));
    }

    getCartData();
  };
  const combinedClass = classNames(style.order_item, additionalClassName);

  return (
    <div className={combinedClass}>
      <div className={style.total_count}>
        <Paragraph size="s2" weight="medium" className={style.title_total_count}>
          Items to Order
        </Paragraph>
        <Paragraph size="s2" weight="medium" className={style.value_total_count}>
          {totalValueItemsInOrder}
        </Paragraph>
      </div>

      <div className={style.total_price_container}>
        <Paragraph size="s2" className={style.total_cost_text}>
          Goods Cost
          <span className={style.line} />${totalPriceBundlesToFixed}
        </Paragraph>
        <Paragraph size="s2" className={style.total_shipping_text}>
          Shipping~
          <span className={style.line} />${560}
          {/* todo shipping price */}
        </Paragraph>
      </div>

      <div className={style.line_separate} />
      <Title size="xs" weight="semi_bold" className={style.total_order_price}>
        Total <span>${totalPriceBundlesToFixed}</span>
      </Title>

      <Button
        className={style.button_checkout}
        onClick={isCheckoutPage ? handlePlaceOrder : handleCheckout}
      >
        {isCheckoutPage ? 'Place Order' : 'Checkout'}
      </Button>

      <Paragraph size="s2" className={style.order_description}>
        Make sure that the quantity of goods and the selected characteristics are correct.
      </Paragraph>

      {children}
    </div>
  );
};
