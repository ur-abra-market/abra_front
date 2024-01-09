import React from 'react';

import { useAppSelector } from 'common/hooks';
import { IProductCardInCart } from 'store/reducers/seller/cart';
import { productsInCart } from 'store/reducers/seller/cart/selectors';
import { Button, Paragraph, Title } from 'ui-kit';

import style from './OrderDetails.module.scss';

export const OrderDetails = (): JSX.Element => {
  const products = useAppSelector(productsInCart);

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

  return (
    <div className={style.order_item}>
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

      <Button className={style.button_checkout}>Сheckout</Button>

      <Paragraph size="s2" className={style.order_description}>
        Make sure that the quantity of goods and the selected characteristics are correct.
      </Paragraph>
    </div>
  );
};
