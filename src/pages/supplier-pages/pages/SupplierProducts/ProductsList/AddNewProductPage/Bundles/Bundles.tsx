import React, { FC } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from 'common/hooks';
import { Label, Input, Select } from 'ui-kit';

import style from './Bundles.module.scss';

export const Bundles: FC = (): JSX.Element => {
  const { register, control } = useForm();
  const categories = useAppSelector(state => state.common.categories);
  const nameData = categories ? categories.filter(c => c.level === 1) : [];

  return (
    <form>
      <div className={style.container}>
        <Label label="Bundle name *" htmlFor="bundle" className={style.label}>
          <Input
            {...register('percentage')}
            placeholder="Enter the name"
            className={style.bundle_name}
          />
        </Label>
        <Label label="Variation type *" htmlFor="variation" className={style.label}>
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
