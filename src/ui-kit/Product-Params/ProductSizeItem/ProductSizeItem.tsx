import React, { FC } from 'react';

import cn from 'classnames';

import { SizeEnum } from 'common/types';

import style from './ProductSizeItem.module.scss';

interface ProductSizeItemProps {
  size: SizeEnum;
  quantity: number;
  selected: boolean;
  onClick: () => void;
}
export const ProductSizeItem: FC<ProductSizeItemProps> = ({
  size,
  quantity,
  selected,
  onClick,
}): JSX.Element => {
  return (
    <button type="button" onClick={onClick}>
      <div className={cn(style.item, { [style.active]: selected })}>{size}</div>
      <div className={style.remains}>{quantity}</div>
    </button>
  );
};
