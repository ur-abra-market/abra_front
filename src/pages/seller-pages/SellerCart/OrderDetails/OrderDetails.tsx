import React from 'react';

import { Button, Paragraph } from 'ui-kit';

import style from './OrderDetails.module.scss';

export const OrderDetails = (): JSX.Element => {
  return (
    <div className={style.order_item}>
      <div className={style.total_count}>
        <Paragraph size="s2" weight="medium" className={style.title_total_count}>
          Items to Order
        </Paragraph>
        <Paragraph size="s2" weight="medium" className={style.value_total_count}>
          {400}
        </Paragraph>
      </div>
      <div className={style.total_price}>
        <Paragraph weight="regular" className={style.total_cost_text}>
          Goods Cost
          <span className={style.line} />${1560}
        </Paragraph>
        <Paragraph weight="regular" className={style.total_shipping_text}>
          Shipping~
          <span className={style.line} />${560}
        </Paragraph>
        <Paragraph size="xs" weight="regular" className={style.total_price_description}>
          * The final cost will be calculated after you add an address
        </Paragraph>
      </div>
      <div className={style.line_separate} />
      <Paragraph className={style.total_order_price}>
        Total <span>${2000}</span>
      </Paragraph>
      <Button className={style.button_checkout}>Сheckout</Button>
      <Paragraph className={style.order_description}>
        Make sure that the quantity of goods and the selected characteristics are correct.
      </Paragraph>
    </div>
  );
};
