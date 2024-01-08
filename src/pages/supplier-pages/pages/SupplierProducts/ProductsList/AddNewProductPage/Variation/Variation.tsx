import React, { FC, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from 'common/hooks';
import { Label, Select, ButtonIcon } from 'ui-kit';

import style from './Variation.module.scss';

export const Variation: FC = (): JSX.Element => {
  const { control } = useForm();
  const categories = useAppSelector(state => state.common.categories);
  const nameData = categories ? categories.filter(c => c.level === 1) : [];
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  const handleSelectVariation = (variationType: string): void => {
    setSelectedVariation(selectedVariation === variationType ? null : variationType);
  };

  return (
    <form>
      <div className={style.container}>
        <div className={style.button_container}>
          <ButtonIcon
            type="button"
            className={`${style.button} ${
              selectedVariation === 'Var 1' ? style.active : ''
            }`}
            onClick={() => handleSelectVariation('Var 1')}
          >
            Var 1
          </ButtonIcon>
          <ButtonIcon
            type="button"
            className={`${style.button} ${
              selectedVariation === 'Var 2' ? style.active : ''
            }`}
            onClick={() => handleSelectVariation('Var 2')}
          >
            Var 2
          </ButtonIcon>
          <ButtonIcon
            type="button"
            className={`${style.plus_button} ${
              selectedVariation === 'Plus' ? style.active : ''
            }`}
            onClick={() => handleSelectVariation('Plus')}
          >
            +
          </ButtonIcon>
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
