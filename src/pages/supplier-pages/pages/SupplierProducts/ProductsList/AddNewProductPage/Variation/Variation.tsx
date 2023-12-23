import React, { FC } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from 'common/hooks';
import { Label, Select } from 'ui-kit';

import style from './Variation.module.scss';

export const Variation: FC = (): JSX.Element => {
  const { control } = useForm();
  const categories = useAppSelector(state => state.common.categories);
  const nameData = categories ? categories.filter(c => c.level === 1) : [];

  return (
    <form>
      <div className={style.container}>
        <div className={style.button_container}>
          <button type="button" className={style.button}>
            Var 1
          </button>
          <button type="button" className={style.button}>
            Var 2
          </button>
          <button type="button" className={style.plus_button}>
            +
          </button>
        </div>
        <Label label="Variation type" htmlFor="variation" className={style.label}>
          <Controller
            name="variation"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Select variation type"
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
      </div>
    </form>
  );
};
