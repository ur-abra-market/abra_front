import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { SelectField } from './SelectField/SelectField';

import { Label, Input } from 'ui-kit';

import style from './Properties.module.scss';

interface ISelectField {
  name: string;
  label: string;
  placeholder?: string;
}

export const Properties: FC = (): JSX.Element => {
  const { register, watch } = useForm();
  const [showAdditional, setShowAdditional] = useState(0);

  const selectedMaterial = watch('material');

  const selectFields: ISelectField[] = [
    { name: 'ocassion', label: 'Ocassion', placeholder: 'Select' },
    { name: 'season', label: 'Season', placeholder: 'Select' },
    { name: 'sizesGrid', label: 'Sizes grid type', placeholder: 'Select' },
    { name: 'gender', label: 'Gender', placeholder: 'Select' },
    {
      name: 'material',
      label: 'Material (optional)',
      placeholder: 'Enter the material name',
    },
  ];

  const generateAdditionalMaterials = (): JSX.Element[] => {
    return Array.from({ length: showAdditional }, (_, index) => (
      <div key={index} className={style.additional}>
        <SelectField
          name={`[showAdditional[${index}].material`}
          label={`Add material ${index + 1}`}
          placeholder="Enter the material name"
        />
        <Label
          label="% (optional)"
          htmlFor={`[showAdditional[${index}].percentage`}
          className={style.label}
        >
          <Input
            {...register('percentage')}
            placeholder="Enter percentage of material"
            className={style.percentage}
          />
        </Label>
      </div>
    ));
  };

  return (
    <form>
      <div className={style.container}>
        {selectFields.map(field => (
          <SelectField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
          />
        ))}
        <Label label="% (optional)" htmlFor="percentage" className={style.label}>
          <Input
            {...register('percentage')}
            placeholder="Enter percentage of material"
            className={style.percentage}
          />
        </Label>
        <button
          type="button"
          className={style.button}
          onClick={() => setShowAdditional(prev => Math.min(prev + 1, 10))}
          disabled={!selectedMaterial || showAdditional === 10}
        >
          + Add material
        </button>
      </div>
      {generateAdditionalMaterials()}
    </form>
  );
};
