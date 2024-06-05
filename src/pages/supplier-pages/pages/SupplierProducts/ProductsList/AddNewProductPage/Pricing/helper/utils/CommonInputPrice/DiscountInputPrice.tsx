import React, { FC } from 'react';

import cn from 'classnames';
import { Control, Controller } from 'react-hook-form';

import { Input } from 'ui-kit';

import style from './CommonInputPrice.module.scss';

interface ICommonInputPrice {
  placeholder: string;
  disabled?: boolean;
  nameInput: string;
  valueVariation: string;
  value: number;
}

export const DiscountInputPrice: FC<ICommonInputPrice> = ({
  placeholder,
  nameInput,
  disabled,
  value,
  valueVariation,
}): JSX.Element => {
  const valueClasses = (value: string): string => {
    return cn(style.currency_value, {
      [style.currency_value_active]: value,
    });
  };

  return (
    <div className={style.price_item}>
      <Input
        classNameWrapper={style.price_wrapper}
        className={style.price_input}
        placeholder={placeholder}
        type="number"
        disabled={disabled}
        value={(value > 100 ? 100 : value) || ''}
      />
      <span className={valueClasses('field.value')}>{valueVariation}</span>
    </div>
  );
};
