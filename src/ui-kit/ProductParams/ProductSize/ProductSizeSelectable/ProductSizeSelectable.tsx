import React, { FC } from 'react';

import cn from 'classnames';

import { SizeEnum } from 'common/types';

import style from './ProductSizeSelectable.module.scss';

interface IProductSizeItem {
  size: SizeEnum;
  selected: boolean;
  handleSizeSelect: () => void;
}
export const ProductSizeSelectable: FC<IProductSizeItem> = ({
  size,
  selected,
  handleSizeSelect,
}): JSX.Element => {
  const sizeClasses = cn(style.size, { [style.selected]: selected });

  return (
    <button type="button" onClick={handleSizeSelect}>
      <div className={sizeClasses}>{size}</div>
    </button>
  );
};