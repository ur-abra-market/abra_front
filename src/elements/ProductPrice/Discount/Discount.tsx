import { FC } from 'react';

import cn from 'classnames';

import style from './Discount.module.scss';

interface IDiscountProps {
  price: number;
}

const discountList = [
  { id: 1, bundles: '100bnd', discount: 0 },
  { id: 2, bundles: '300bnd', discount: 0.03, extraDiscount: 0.05 },
  { id: 3, bundles: '500bnd', discount: 0.06 },
];

export const Discount: FC<IDiscountProps> = ({ price }): JSX.Element => {
  return (
    <ul className={style.items}>
      {discountList.map(el => (
        <li className={style.item} key={el.id}>
          {el.bundles}
          <div className={style.decor} />
          <span className={cn({ [style.delete]: el.extraDiscount })}>{`$${(
            price -
            price * el.discount
          ).toFixed(2)}/bnd`}</span>
          {el.extraDiscount && (
            <span className={style.extra_discount}>
              {`${(price - price * el.extraDiscount).toFixed(2)}$/bnd`}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
