import React, { FC } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from 'common/hooks';
import { Label, Select } from 'ui-kit';

import style from './Select.module.scss';

interface ISelectField {
  name: string;
  label: string;
  placeholder?: string;
}

export const SelectField: FC<ISelectField> = ({ name, label, placeholder }) => {
  const { control } = useForm();
  const categories = useAppSelector(state => state.common.categories);
  const nameData = categories ? categories.filter(c => c.level === 1) : [];

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
              options={nameData.map(el => ({
                value: el.id,
                label: { text: el.name },
              }))}
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
