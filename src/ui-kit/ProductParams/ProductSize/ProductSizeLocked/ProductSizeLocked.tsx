import React, { FC } from 'react';

import { SizeEnum } from 'common/types';

import style from './ProductSizeLocked.module.scss';

interface IProductSizeLocked {
  size: SizeEnum;
  quantity: number;
}
export const ProductSizeLocked: FC<IProductSizeLocked> = ({
  size,
  quantity,
}): JSX.Element => {
  return (
    <button type="button" disabled>
      <div className={style.size}>{size}</div>
      <div className={style.quantity}>{quantity}</div>
    </button>
  );
};