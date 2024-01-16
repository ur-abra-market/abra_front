import { FC } from 'react';

import cn from 'classnames';

import style from './Discount.module.scss';

interface IDiscountProps {
  className?: string;
}

const discountList = [
  { id: 1, bundles: '100bnd', discount: 0 },
  { id: 2, bundles: '300bnd', discount: 0.03, extraDiscount: 0.05 },
  { id: 3, bundles: '500bnd', discount: 0.06 },
];

export const Discount: FC<IDiscountProps> = ({ className }): JSX.Element => {
  return (
    <ul className={cn(style.items, className)}>
      {discountList.map(el => (
        <li className={style.item} key={el.id}>
          {el.bundles}
          <div className={style.decor} />
          <span className={cn({ [style.delete]: el.extraDiscount })}>{`$${(
            4.25 -
            4.25 * el.discount
          ).toFixed(2)}/pcs`}</span>
          {el.extraDiscount && (
            <span className={style.extra_discount}>
              {`${(4.25 - 4.25 * el.extraDiscount).toFixed(2)}$/pcs`}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
