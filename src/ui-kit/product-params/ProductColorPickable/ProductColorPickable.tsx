import React, { FC } from 'react';

import cn from 'classnames';

import style from './ProductColorPickable.module.scss';

interface IProductColorPickable {
  selectedColorId: number | null;
  id: number;
  imageUrl: string;
  selectColor: (id: number) => void;
  className?: string;
}

export const ProductColorPickable: FC<IProductColorPickable> = ({
  selectedColorId,
  id,
  imageUrl,
  selectColor,
  className,
}): JSX.Element => {
  const isSelected = id === selectedColorId;
  const productColorClasses = cn(className, style.item, {
    [style.active]: isSelected,
  });

  return (
    <button type="button" onClick={() => selectColor(id)} className={productColorClasses}>
      <img className={style.color_image} src={imageUrl} alt="color" />
    </button>
  );
};
