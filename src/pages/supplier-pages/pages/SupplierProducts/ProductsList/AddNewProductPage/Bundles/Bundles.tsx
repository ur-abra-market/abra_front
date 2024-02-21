import React, { FC, useState } from 'react';

import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';

import { BundlesButton } from './BundlesButton/BundlesButton';

import { useAppSelector } from 'common/hooks';
import { Label, Input, Select, ButtonIcon } from 'ui-kit';

import style from './Bundles.module.scss';

const bundlesData = ['Bundle 1', 'Bundle 2'];

export const Bundles: FC = (): JSX.Element => {
  const { register, control } = useForm();
  const categories = useAppSelector(state => state.common.categories);
  const nameData = categories ? categories.filter(c => c.level === 1) : [];
  const [bundles, setBundles] = useState<string | null>(null);
  const classNames = {
    [style.active]: bundles === 'Plus',
  };

  const handleSelectVariation = (bundleType: string): void => {
    setBundles(bundles === bundleType ? null : bundleType);
  };

  return (
    <form>
      <div className={style.bundles_container}>
        {bundlesData.map(bundleType => (
          <BundlesButton
            key={bundleType}
            variationType={bundleType}
            selected={bundles === bundleType}
            onClick={() => handleSelectVariation(bundleType)}
          />
        ))}
      </div>
      <div className={style.button_container}>
        <ButtonIcon
          type="button"
          className={cn(style.plus_button, classNames)}
          onClick={() => handleSelectVariation('Plus')}
        >
          +
        </ButtonIcon>
      </div>
      <div className={style.container}>
        <Label label="Bundle name *" htmlFor="bundle" className={style.label}>
          <Input
            {...register('bundle')}
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
