import React, { forwardRef, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './ProductSizePickable.module.scss';

interface IProductSizePickable extends HTMLAttributes<HTMLButtonElement> {
  size: string;
  selectedSizeId: number | null;
  id: string;
  handleSelectSize: (id: number) => void;
  className?: string;
}

export const ProductSizePickable = forwardRef<HTMLButtonElement, IProductSizePickable>(
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
