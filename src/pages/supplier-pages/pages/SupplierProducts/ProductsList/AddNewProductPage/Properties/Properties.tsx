import React, { FC, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from 'common/hooks';
import { Label, Input, Select } from 'ui-kit';

import style from './Properties.module.scss';

export const Properties: FC = (): JSX.Element => {
  const { control, watch } = useForm();
  const categories = useAppSelector(state => state.common.categories);
  const nameData = categories ? categories.filter(c => c.level === 1) : [];

  const [showAdditional, setShowAdditional] = useState(false);

  const selectedMaterial = watch('material');

  return (
    <form>
      <div className={style.container}>
        <Label label="Ocassion" htmlFor="ocassion" className={style.label}>
          <Controller
            name="ocassion"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Select"
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
        <Label label="Season" htmlFor="season" className={style.label}>
          <Controller
            name="season"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Select"
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
        <Label label="Sizes grid type" htmlFor="sizesGrid" className={style.label}>
          <Controller
            name="sizesGrid"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Select"
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
        <Label label="Gender" htmlFor="gender" className={style.label}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Select"
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
        <Label label="Material (optional)" htmlFor="material" className={style.label}>
          <Controller
            name="material"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Enter the material name"
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
        <Label label="% (optional)" htmlFor="percentage" className={style.label}>
          <Controller
            name="percentage"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter percentage of material"
                className={style.percentage}
              />
            )}
          />
        </Label>
        <button
          type="button"
          className={style.button}
          onClick={() => setShowAdditional(!showAdditional)}
          disabled={!selectedMaterial}
        >
          + Add material
        </button>
      </div>
      {showAdditional && (
        <div className={style.additional}>
          <Label label="Add material" htmlFor="addMaterial" className={style.label}>
            <Controller
              name="addMaterial"
              control={control}
              render={({ field }) => (
                <div className={style.select_container}>
                  <Select
                    {...field}
                    placeholder="Enter the material name"
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
          <Label label="% (optional)" htmlFor="percentage" className={style.label}>
            <Controller
              name="percentage"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter percentage of material"
                  className={style.percentage}
                />
              )}
            />
          </Label>
        </div>
      )}
    </form>
  );
};
