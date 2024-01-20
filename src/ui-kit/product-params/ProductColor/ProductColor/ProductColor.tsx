import React, { forwardRef, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './ProductColor.module.scss';

interface IProductColor extends HTMLAttributes<HTMLDivElement> {
  value: number;
  imageUrl: string;
  className?: string;
}

export const ProductColor = forwardRef<HTMLDivElement, IProductColor>(
  ({ imageUrl, value, className }, ref): JSX.Element => {
    return (
      <div className={cn(style.item, className)} ref={ref}>
        <img className={style.color_image} src={imageUrl} alt="color" />
        <span className={style.amount}>{value}</span>
      </div>
    );
  },
);
