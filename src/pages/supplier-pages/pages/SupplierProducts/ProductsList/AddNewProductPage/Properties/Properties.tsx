import React, { FC, useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { SelectField } from './SelectField/SelectField';

import { Label, Input } from 'ui-kit';

import style from './Properties.module.scss';

interface IMaterial {
  id: number;
  name: string;
}

interface ISelectField {
  name: string;
  label: string;
  placeholder?: string;
  materials?: IMaterial[];
}

const materialData: IMaterial[] = [
  { id: 1, name: 'Cotton' },
  { id: 2, name: 'Polyester' },
  { id: 3, name: 'Silk' },
  { id: 4, name: 'Wool' },
];

export const Properties: FC = (): JSX.Element => {
  const { register } = useForm();
  const [showAdditional, setShowAdditional] = useState(0);
  const [additionalMaterials, setAdditionalMaterials] = useState<IMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<IMaterial | null>(null);

  const selectFields: ISelectField[] = [
    { name: 'ocassion', label: 'Ocassion', placeholder: 'Select' },
    { name: 'season', label: 'Season', placeholder: 'Select' },
    {
      name: 'sizesGrid',
      label: 'Sizes grid type',
      placeholder: 'Select',
    },
    { name: 'gender', label: 'Gender', placeholder: 'Select' },
    {
      name: 'material',
      label: 'Material (optional)',
      placeholder: 'Enter the material name',
      materials: materialData,
    },
  ];

  const generateAdditionalMaterials = (): JSX.Element[] => {
    return Array.from({ length: showAdditional }, (_, index) => (
      <div key={index} className={style.additional}>
        <SelectField
          label={`Add material ${index + 1}`}
          placeholder="Enter the material name"
          {...register(`showAdditional[${index}].material`)}
        />
        <Label
          label="% (optional)"
          htmlFor={`showAdditional[${index}].percentage`}
          className={style.label}
        >
          <Input
            {...register(`showAdditional[${index}].percentage`)}
            placeholder="Enter percentage of material"
            className={style.percentage}
          />
        </Label>
      </div>
    ));
  };

  useEffect(() => {
    if (selectedMaterial) {
      const newAdditionalMaterials = materialData.filter(
        material => material.id !== selectedMaterial.id,
      );

      setAdditionalMaterials(newAdditionalMaterials);
    } else {
      setAdditionalMaterials([]);
    }
  }, [selectedMaterial]);

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
