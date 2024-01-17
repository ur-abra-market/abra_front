import React, { forwardRef, HTMLAttributes } from 'react';

import style from './ProductSize.module.scss';

interface IProductSize extends HTMLAttributes<HTMLButtonElement> {
  size: string;
  quantity: number;
}

export const ProductSize = forwardRef<HTMLButtonElement, IProductSize>(
  ({ size, quantity }, ref) => {
    return (
      <button type="button" disabled ref={ref}>
        <div className={style.size}>{size}</div>
        <div className={style.quantity}>{quantity}</div>
      </button>
    );
  },
);
