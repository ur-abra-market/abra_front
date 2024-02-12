import React, { FC } from 'react';

import cn from 'classnames';
import { Control, Controller } from 'react-hook-form';

import { Input } from 'ui-kit';

import style from './CommonInputPrice.module.scss';

interface ICommonInputPrice {
  control: Control<any>;
  placeholder: string;
  disabled?: boolean;
  nameInput: string;
  valueVariation: string;
}

export const DiscountInputPrice: FC<ICommonInputPrice> = ({
  control,
  placeholder,
  nameInput,
  disabled,
  valueVariation,
}): JSX.Element => {
  const valueClasses = (value: string): string => {
    return cn(style.currency_value, {
      [style.currency_value_active]: value,
    });
  };

  return (
    <Controller
      name={nameInput}
      control={control}
      render={({ field }) => (
        <div className={style.price_item}>
          <Input
            {...field}
            classNameWrapper={style.price_wrapper}
            className={style.price_input}
            placeholder={placeholder}
            type="number"
            disabled={disabled}
            value={(field.value > 100 ? 100 : field.value) || ''}
          />
          <span className={valueClasses(field.value)}>{valueVariation}</span>
        </div>
      )}
    />
  );
};
