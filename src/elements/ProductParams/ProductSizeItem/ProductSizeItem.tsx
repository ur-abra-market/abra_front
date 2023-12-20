import React, { FC } from 'react';

import cn from 'classnames';

import { SizeEnum } from 'common/types';

import style from './ProductSizeItem.module.scss';

interface ProductSizeItemProps {
  size: SizeEnum;
  quantity: number;
  active: boolean;
  onClick: () => void;
}
export const ProductSizeItem: FC<ProductSizeItemProps> = ({
  size,
  quantity,
  active,
  onClick,
}): JSX.Element => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li onClick={onClick}>
      <span className={cn(style.item, { [style.active]: active })}>{size}</span>
      <span className={style.remains}>{quantity}</span>
    </li>
  );
};
