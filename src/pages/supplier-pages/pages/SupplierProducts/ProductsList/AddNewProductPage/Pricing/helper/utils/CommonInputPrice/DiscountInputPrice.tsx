import React, { ChangeEvent, FC } from 'react';

import cn from 'classnames';

import { Input } from 'ui-kit';

import style from './CommonInputPrice.module.scss';

interface ICommonInputPrice {
  placeholder: string;
  disabled?: boolean;
  valueVariation: string;
  value: number;
  onProductDiscountChange: (discount: number) => void;
}

export const DiscountInputPrice: FC<ICommonInputPrice> = ({
  placeholder,
  disabled,
  value,
  valueVariation,
  onProductDiscountChange,
}): JSX.Element => {
  const valueClasses = (value: string): string => {
    return cn(style.currency_value, {
      [style.currency_value_active]: value,
    });
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    onProductDiscountChange(Number(event.currentTarget.value.trim()));
  };

  return (
    <div className={style.price_item}>
      <Input
        classNameWrapper={style.price_wrapper}
        className={style.price_input}
        placeholder={placeholder}
        disabled={disabled}
        value={(value > 100 ? 100 : value) || ''}
        onChange={onChangeHandler}
      />
      <span className={valueClasses('field.value')}>{valueVariation}</span>
    </div>
  );
};
