import React, { forwardRef, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './ProductSizeSelectable.module.scss';

interface IProductSizeItem extends HTMLAttributes<HTMLButtonElement> {
  size: string;
  selectedSizeId: number | null;
  id: string;
  handleSelectSize: (id: number) => void;
  className?: string;
}

export const ProductSizeSelectable = forwardRef<HTMLButtonElement, IProductSizeItem>(
  ({ size, id, selectedSizeId, handleSelectSize, className }, ref): JSX.Element => {
    const isSelected = +id === selectedSizeId;
    const sizeClasses = cn(className, style.item, style.size, {
      [style.selected]: isSelected,
    });

    return (
      <button
        type="button"
        className={sizeClasses}
        onClick={() => handleSelectSize(+id)}
        ref={ref}
      >
        <div>{size}</div>
      </button>
    );
  },
);
