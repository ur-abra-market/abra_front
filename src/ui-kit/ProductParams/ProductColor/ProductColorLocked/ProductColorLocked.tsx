import React, { FC } from 'react';

import cn from 'classnames';

import style from './ProductColorLocked.module.scss';

interface IProductColorLocked {
  value: number;
  image_url: string;
  className?: string;
}

export const ProductColorLocked: FC<IProductColorLocked> = ({
  image_url,
  value,
  className,
}): JSX.Element => {
  return (
    <button type="button" className={cn(style.item, className)} disabled>
      <img className={style.color_image} src={image_url} alt="color" />
      <span className={style.remains}>{value}</span>
    </button>
  );
};
