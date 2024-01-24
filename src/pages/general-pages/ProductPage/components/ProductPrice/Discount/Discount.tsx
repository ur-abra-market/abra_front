import { FC } from 'react';

import cn from 'classnames';

import { discountCounter } from './helper/discountCounter';

import { IPricesBundle } from 'store/reducers/productSlice/types';

import style from './Discount.module.scss';

interface IDiscountProps {
  prices: IPricesBundle[];
  className?: string;
}

export const Discount: FC<IDiscountProps> = ({ className, prices }): JSX.Element => {
  return (
    <ul className={cn(style.items, className)}>
      {prices.map(el => (
        <li className={style.item} key={el.id}>
          {`${el.min_quantity}bnd`}
          <div className={style.decor} />
          <span className={cn({ [style.delete]: el.discount })}>
            {`$${el.price.toFixed(2)}/pcs`}
          </span>
          {el.discount > 0 && (
            <span className={style.extra_discount}>
              {`${discountCounter(el.price, el.discount).toFixed(2)}$/pcs`}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
