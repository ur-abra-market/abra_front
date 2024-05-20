import React, { FC, useState } from 'react';

import cn from 'classnames';

import style from './ProductColorPickable.module.scss';

interface IProductColorPickable {
  selectedColorId: number | null;
  id: number;
  imageUrl: string;
  selectColor: (id: number) => void;
  className?: string;
  colorName: string;
}

export const ProductColorPickable: FC<IProductColorPickable> = ({
  selectedColorId,
  id,
  imageUrl,
  selectColor,
  colorName,
  className,
}): JSX.Element => {
  const isSelected = id === selectedColorId;
  const productColorClasses = cn(className, style.item, {
    [style.active]: isSelected,
  });

  const [isError, setIsError] = useState(false);

  return (
    <button type="button" onClick={() => selectColor(id)} className={productColorClasses}>
      {isError ? (
        <div className={style.color_name}>{colorName}</div>
      ) : (
        <img
          className={style.color_image}
          onError={() => setIsError(true)}
          src={imageUrl}
          alt={colorName}
        />
      )}
    </button>
  );
};
