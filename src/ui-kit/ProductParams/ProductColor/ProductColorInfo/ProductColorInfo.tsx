import React, { FC } from 'react';

import cn from 'classnames';

import style from './ProductColorInfo.module.scss';

interface IProductColorsInfo {
  id: string;
  value: number;
  image_url: string;
  className?: string;
}

export const ProductColorInfo: FC<IProductColorsInfo> = ({
  id,
  image_url,
  value,
  className,
}): JSX.Element => {
  return (
    <button type="button" id={id} className={cn(style.list_item, className)} disabled>
      <img src={image_url} alt="color" />
      <span className={style.remains}>{value}</span>
    </button>
  );
};
