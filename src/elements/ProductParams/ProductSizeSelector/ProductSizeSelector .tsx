import React, { FC, useState } from 'react';

import cn from 'classnames';

import { SizeEnum } from 'common/types';

import style from './ProductSizeSelector.module.scss';

interface ProductSizeSelectorProps {
  size: SizeEnum;
  quantity: number;
}
export const ProductSizeSelector: FC<ProductSizeSelectorProps> = ({
  size,
  quantity,
}): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const handleSize = (): void => {
    setIsActive(prev => !prev);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li onClick={handleSize}>
      <span className={cn(style.item, { [style.active]: isActive })}>{size}</span>
      <span className={style.remains}>{quantity}</span>
    </li>
  );
};
