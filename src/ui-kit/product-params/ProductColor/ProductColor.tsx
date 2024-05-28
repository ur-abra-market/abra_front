import React, { forwardRef, HTMLAttributes, useState } from 'react';

import cn from 'classnames';

import style from './ProductColor.module.scss';

interface IProductColor extends HTMLAttributes<HTMLDivElement> {
  value: number;
  imageUrl: string;
  className?: string;
  colorName: string;
}

export const ProductColor = forwardRef<HTMLDivElement, IProductColor>(
  ({ imageUrl, value, className, colorName }, ref): JSX.Element => {
    const [isError, setIsError] = useState(false);

    return (
      <div className={cn(style.item, className)} ref={ref}>
        {isError ? (
          <div className={style.color_name}>{colorName}</div>
        ) : (
          <img
            className={style.color_image}
            onError={() => setIsError(true)}
            src={imageUrl}
            alt={colorName}
          />
        )}
        <span className={style.amount}>{value}</span>
      </div>
    );
  },
);
