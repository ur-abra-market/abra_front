import React, { FC } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Label, Select } from 'ui-kit';

import style from './Select.module.scss';

export interface IMaterial {
  id: number;
  name: string;
  label: string;
  placeholder: string;
}

export interface ISelectField {
  name: string;
  label: string;
  placeholder?: string;
  options: IMaterial[];
}

export const SelectField: FC<ISelectField> = ({ name, label, placeholder, options }) => {
  const { control } = useForm();

  return (
    <Label label={label} htmlFor={name} className={style.label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={style.select_container}>
            <Select
              {...field}
              placeholder={placeholder || 'Select'}
              className={style.select_input}
              options={
                options && options.map(el => ({ value: el.id, label: { text: el.name } }))
              }
              onChange={value => {
                field.onChange(String(value.value));
              }}
            />
          </div>
        )}
      />
    </Label>
  );
};