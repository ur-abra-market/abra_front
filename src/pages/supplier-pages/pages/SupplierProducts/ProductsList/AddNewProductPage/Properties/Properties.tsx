import React, { FC, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { SelectField } from './SelectField/SelectField';

import { Label, Input } from 'ui-kit';

import style from './Properties.module.scss';

export const Properties: FC = (): JSX.Element => {
  const { control, watch } = useForm();
  const [showAdditional, setShowAdditional] = useState(false);

  const selectedMaterial = watch('material');

  return (
    <form>
      <div className={style.container}>
        <SelectField name="ocassion" label="Ocassion" />
        <SelectField name="season" label="Season" />
        <SelectField name="sizesGrid" label="Sizes grid type" />
        <SelectField name="gender" label="Gender" />
        <SelectField
          name="material"
          label="Material (optional)"
          placeholder="Enter the material name"
        />
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
          <SelectField
            name="addMaterial"
            label="Add material"
            placeholder="Enter the material name"
          />
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
