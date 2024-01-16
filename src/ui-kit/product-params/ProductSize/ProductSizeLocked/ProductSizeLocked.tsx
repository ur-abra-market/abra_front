import React, { forwardRef, HTMLAttributes } from 'react';

import style from './ProductSizeLocked.module.scss';

interface IProductSizeLocked extends HTMLAttributes<HTMLButtonElement> {
  size: string;
  quantity: number;
}

export const ProductSizeLocked = forwardRef<HTMLButtonElement, IProductSizeLocked>(
  ({ size, quantity }, ref) => {
    return (
      <button type="button" disabled ref={ref}>
        <div className={style.size}>{size}</div>
        <div className={style.quantity}>{quantity}</div>
      </button>
    );
  },
);
