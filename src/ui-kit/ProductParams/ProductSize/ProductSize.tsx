import React, { FC } from 'react';

import cn from 'classnames';

import { SizeEnum } from 'common/types';

import style from './ProductSize.module.scss';

interface ProductSizeItemProps {
  size: SizeEnum;
  quantity: number;
  selected: boolean;
  onClick: () => void;
}
export const ProductSize: FC<ProductSizeItemProps> = ({
  size,
  quantity,
  selected,
  onClick,
}): JSX.Element => {
  const itemStyles = cn(style.item, { [style.active]: selected });

  return (
    <button type="button" onClick={onClick}>
      <div className={itemStyles}>{size}</div>
      <div className={style.remains}>{quantity}</div>
    </button>
  );
};
