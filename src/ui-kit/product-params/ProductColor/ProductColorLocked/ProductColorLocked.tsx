import React, { forwardRef, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './ProductColorLocked.module.scss';

interface IProductColorLocked extends HTMLAttributes<HTMLButtonElement> {
  value: number;
  imageUrl: string;
  className?: string;
}

export const ProductColorLocked = forwardRef<HTMLButtonElement, IProductColorLocked>(
  ({ imageUrl, value, className }, ref): JSX.Element => {
    return (
      <button type="button" className={cn(style.item, className)} ref={ref} disabled>
        <img className={style.color_image} src={imageUrl} alt="color" />
        <span className={style.amount}>{value}</span>
      </button>
    );
  },
);
