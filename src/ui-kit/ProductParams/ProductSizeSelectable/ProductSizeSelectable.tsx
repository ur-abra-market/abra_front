import React, { FC } from 'react';

import cn from 'classnames';

import { SizeEnum } from 'common/types';

import style from './ProductSizeSelectable.module.scss';

interface ProductSizeItemProps {
  size: SizeEnum;
  selected: boolean;
  onClick: () => void;
}
export const ProductSizeSelectable: FC<ProductSizeItemProps> = ({
  size,
  selected,
  onClick,
}): JSX.Element => {
  const itemStyles = cn(style.item, { [style.active]: selected });

  return (
    <button type="button" onClick={onClick}>
      <div className={itemStyles}>{size}</div>
    </button>
  );
};
