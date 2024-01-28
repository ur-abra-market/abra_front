import React, { ChangeEvent, FC } from 'react';

import cn from 'classnames';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { Input } from 'ui-kit';

import style from './CommonInputPrice.module.scss';

interface ICommonInputPrice {
  control: Control;
  placeholder: string;
  disabled?: boolean;
  setPrice: (value: number) => void;
  nameInput: string;
  valueVariation: string;
}

const minValue = 0;

export const CommonInputPrice: FC<ICommonInputPrice> = ({
  control,
  placeholder,
  setPrice,
  nameInput,
  disabled,
  valueVariation,
}): JSX.Element => {
  const handleChangePrice = (
    event: ChangeEvent<HTMLInputElement>,
    field: FieldValues,
  ): void => {
    const inputValue = parseInt(event.currentTarget.value.trim(), 10);
    const value = String(event.currentTarget.value).replace(/^[.+-]+/g, '');

    if (inputValue < minValue) {
      field.onChange(minValue);
      setPrice(minValue);
    } else {
      field.onChange(value);
      setPrice(Number(value));
    }
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
            value={field.value || ''}
            onChange={event => handleChangePrice(event, field)}
          />
          <span
            className={cn(style.currency_value, {
              [style.currency_value_active]: field.value,
            })}
          >
            {valueVariation}
          </span>
        </div>
      )}
    />
  );
};
