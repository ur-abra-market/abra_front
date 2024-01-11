import React, { FC } from 'react';

import cn from 'classnames';

import style from './ProductColorLocked.module.scss';

interface IProductColorLocked {
  value: number;
  imageUrl: string;
  className?: string;
}

export const ProductColorLocked: FC<IProductColorLocked> = ({
  imageUrl,
  value,
  className,
}): JSX.Element => {
  return (
    <button type="button" className={cn(style.item, className)} disabled>
      <img className={style.color_image} src={imageUrl} alt="color" />
      <span className={style.amount}>{value}</span>
    </button>
  );
};
