import React, { forwardRef, HTMLAttributes, useState } from 'react';

import cn from 'classnames';

import style from './ProductColor.module.scss';

interface IProductColor extends HTMLAttributes<HTMLDivElement> {
  value: number;
  imageUrl: string;
  className?: string;
  handleSelectColorOrSize?: (id: number, quantity: number) => void;
  selectedId?: { id: number }[];
  isBundles?: boolean;
  colorId?: number;
  colorName: string;
}

export const ProductColor = forwardRef<HTMLDivElement, IProductColor>(
  (
    {
      imageUrl,
      value,
      className,
      isBundles,
      handleSelectColorOrSize,
      selectedId,
      colorId,
      colorName,
    },
    ref,
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [newQuantity, setNewQuantity] = useState(value);
    const [isError, setIsError] = useState(false);

    const isSelected = selectedId?.some(selected => selected.id === colorId);

    const amount = cn(style.amount, {
      [style.selected_amount]: isSelected,
    });
    const color = cn(style.color_image, {
      [style.selected]: isSelected,
    });
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNewQuantity(Number(event.target.value));
    };

    if (!isBundles) {
      return (
        <div className={cn(style.item, className)} ref={ref}>
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
          <span className={style.amount}>{value}</span>
        </div>
      );
    }
    const handlerOnCLick = (): void => {
      if (handleSelectColorOrSize && colorId) {
        handleSelectColorOrSize(colorId, newQuantity);
      }
    };

    return (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handlerOnCLick}
        className={cn(style.item_bundles, className)}
        ref={ref}
        onClick={handlerOnCLick}
      >
        <img className={color} src={imageUrl} alt="color" />
        <span
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handlerOnCLick}
          onClick={() => setIsOpen(true)}
          className={amount}
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
        </span>
      </div>
    );
  },
);
