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

export const ProductSize = forwardRef<HTMLDivElement, IProductSize>((props, ref) => {
  const { size, quantity, sizeId, handleSelectColorOrSize, selectedId, isBundles } =
    props;

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
  const handlerOnCLick = (): void => {
    if (handleSelectColorOrSize && sizeId) {
      handleSelectColorOrSize(sizeId, quantity);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      ref={ref}
      onKeyDown={e => e.key === 'Enter' && handlerOnCLick}
      onClick={handlerOnCLick}
    >
      <div className={`${style.size_bundles} ${isSelected && style.selected_size}`}>
        {size}
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handlerOnCLick}
        onClick={() => setIsOpen(true)}
        className={`${style.quantity_bundles} ${isSelected && style.selected_quantity}`}
      >
        {isOpen ? (
          <input
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
});
