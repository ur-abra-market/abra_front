import React, { forwardRef, HTMLAttributes } from 'react';

import style from './ProductSize.module.scss';

interface IProductSize extends HTMLAttributes<HTMLDivElement> {
  size: string;
  quantity: number;
}

export const ProductSize = forwardRef<HTMLDivElement, IProductSize>(
  ({ size, quantity }, ref) => {
    return (
      <div ref={ref}>
        <div className={style.size}>{size}</div>
        <div className={style.quantity}>{quantity}</div>
      </div>
    );
  },
);
