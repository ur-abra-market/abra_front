import React, { forwardRef, HTMLAttributes, useState } from 'react';

import style from './ProductSize.module.scss';

interface IProductSize extends HTMLAttributes<HTMLDivElement> {
  size: string;
  quantity: number;
  sizeId?: number;
  handleSelectColorOrSize?: (id: number, quantity: number) => void;
  selectedId?: { id: number }[];
  isBundles?: boolean;
}

export const ProductSize = forwardRef<HTMLDivElement, IProductSize>(
  ({ size, quantity, sizeId, handleSelectColorOrSize, selectedId, isBundles }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);

    const isSelected = selectedId?.some(selected => selected.id === sizeId);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNewQuantity(Number(event.target.value));
    };

    if (!isBundles) {
      return (
        <div ref={ref}>
          <div className={style.size}>{size}</div>
          <div className={style.quantity}>{quantity}</div>
        </div>
      );
    }

    return (
      // @ts-ignore
      // eslint-disable-next-line
      <div ref={ref} onClick={() => handleSelectColorOrSize(sizeId, newQuantity)}>
        <div className={`${style.size_bundles} ${isSelected && style.selected_size}`}>
          {size}
        </div>
        {/* eslint-disable-next-line */}
        <div
          onClick={() => setIsOpen(true)}
          className={`${style.quantity_bundles} ${isSelected && style.selected_quantity}`}
        >
          {isOpen ? (
            <input
              /* eslint-disable-next-line jsx-a11y/no-autofocus */
              autoFocus
              type="number"
              onBlur={() => setIsOpen(false)}
              onChange={handleOnChange}
              className={style.input}
              value={newQuantity}
            />
          ) : (
            newQuantity
          )}
        </div>
      </div>
    );
  },
);
