import React, { FC, useState } from 'react';

import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';

import { VariationButton } from './VariationButton/VariationButton';

import { useAppSelector } from 'common/hooks';
import { Label, Select, ButtonIcon } from 'ui-kit';

import style from './Variation.module.scss';

const variationsData = ['Var 1', 'Var 2'];

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
          {variationsData.map(variationType => (
            <VariationButton
              key={variationType}
              variationType={variationType}
              selected={selectedVariation === variationType}
              onClick={() => handleSelectVariation(variationType)}
            />
          ))}
          <ButtonIcon
            type="button"
            className={cn(style.plus_button, {
              [style.active]: selectedVariation === 'Plus',
            })}
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
