import React, { FC } from 'react';

import { Input, Label } from 'ui-kit';

import style from './TotalPrice.module.scss';

export interface ITotalPrice {
  price: number;
  discountPrice: number;
  totalPrice: number;
}

export const TotalPrice: FC<ITotalPrice> = ({
  price,
  discountPrice,
  totalPrice,
}): JSX.Element => {
  return (
    <div className={style.total_price}>
      <Label label="Bundle price" htmlFor="bundlePrice">
        <div className={style.price_item}>
          <Input
            value={price}
            classNameWrapper={style.price_wrapper}
            className={style.price_input}
            disabled
          />
          <span className={style.currency_value}>$</span>
        </div>
      </Label>
      <div className={style.discount_total_wrapper}>
        <Label label="Discount">
          <div className={style.price_item}>
            <Input
              value={discountPrice}
              classNameWrapper={style.price_wrapper}
              className={style.price_input}
              disabled
            />
            <span className={style.currency_value}>%</span>
          </div>
        </Label>
        <Label label="Total">
          <div className={style.price_item}>
            <Input
              value={totalPrice}
              classNameWrapper={style.price_wrapper}
              className={style.price_input}
              disabled
            />
            <span className={style.currency_value}>$</span>
          </div>
        </Label>
      </div>
    </div>
  );
};
