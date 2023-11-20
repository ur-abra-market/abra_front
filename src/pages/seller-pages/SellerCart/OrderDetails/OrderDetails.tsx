import React from 'react';

import { useAppSelector } from 'common/hooks';
import { totalAmountInCart } from 'store/reducers/seller/cart';
import { Button, Paragraph, Title } from 'ui-kit';

import style from './OrderDetails.module.scss';

export const OrderDetails = (): JSX.Element => {
  const totalAmount = useAppSelector(totalAmountInCart);

  return (
    <div className={style.order_item}>
      <div className={style.total_count}>
        <Paragraph size="s2" weight="medium" className={style.title_total_count}>
          Items to Order
        </Paragraph>
        <Paragraph size="s2" weight="medium" className={style.value_total_count}>
          {totalAmount}
        </Paragraph>
      </div>
      <div className={style.total_price}>
        <Paragraph size="s2" className={style.total_cost_text}>
          Goods Cost
          <span className={style.line} />${1560}
        </Paragraph>
        <Paragraph size="s2" className={style.total_shipping_text}>
          Shipping~
          <span className={style.line} />${560}
        </Paragraph>
        <Paragraph size="xs" className={style.total_price_description}>
          * The final cost will be calculated after you add an address
        </Paragraph>
      </div>
      <div className={style.line_separate} />
      <Title size="xs" weight="semi_bold" className={style.total_order_price}>
        Total <span>${2000}</span>
      </Title>
      <Button className={style.button_checkout}>Сheckout</Button>
      <Paragraph size="s2" className={style.order_description}>
        Make sure that the quantity of goods and the selected characteristics are correct.
      </Paragraph>
    </div>
  );
};
