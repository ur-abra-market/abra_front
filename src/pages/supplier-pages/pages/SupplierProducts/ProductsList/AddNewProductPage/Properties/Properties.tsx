import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import {
  IMaterial,
  SelectField,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Properties/SelectField/SelectField';
import { Label, Input } from 'ui-kit';

import style from './Properties.module.scss';

// todo temp data
const materialData: IMaterial[] = [
  { id: 1, name: 'Cotton', label: 'Ocassion 1', placeholder: 'Select' },
  { id: 2, name: 'Polyester', label: 'Ocassion 1', placeholder: 'Select' },
  { id: 3, name: 'Silk', label: 'Ocassion 1', placeholder: 'Select' },
  { id: 4, name: 'Wool', label: 'Ocassion 1', placeholder: 'Select' },
];

// todo temp data
const tempData = [
  { id: 1, name: 'item 1', label: 'Ocassion 1', placeholder: 'Select' },
  { id: 2, name: 'item 2', label: 'Season 1', placeholder: 'Select' },
  {
    id: 3,
    name: 'item 3',
    label: 'Sizes grid type 1',
    placeholder: 'Select',
  },
  { id: 4, name: 'item 4', label: 'Gender 1', placeholder: 'Select' },
  {
    id: 5,
    name: 'material',
    label: 'Material (optional) 1',
    placeholder: 'Enter the material name',
    options: materialData,
  },
];

// todo temp data
const selectFields = [
  {
    id: 1,
    name: 'ocassion',
    label: 'Ocassion',
    placeholder: 'Select',
    options: tempData,
  },
  { id: 2, name: 'season', label: 'Season', placeholder: 'Select', options: tempData },
  {
    id: 3,
    name: 'sizesGrid',
    label: 'Sizes grid type',
    placeholder: 'Select',
    options: tempData,
  },
  { id: 4, name: 'gender', label: 'Gender', placeholder: 'Select', options: tempData },
  {
    id: 5,
    name: 'material',
    label: 'Material (optional)',
    placeholder: 'Enter the material name',
    options: materialData,
  },
];

export const Properties = (): JSX.Element => {
  const { register } = useForm();
  const [showAdditional, setShowAdditional] = useState(0);
  const [additionalMaterials, setAdditionalMaterials] = useState<IMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<IMaterial | null>(null);

  const onChangeHandler = (value: IMaterial): void => {
    setSelectedMaterial(value);
    setAdditionalMaterials(prevMaterials => [...prevMaterials, value]);
  };

  const generateAdditionalMaterials = (): JSX.Element[] => {
    return additionalMaterials.map((_, index) => (
      <div key={index} className={style.additional}>
        <SelectField
          label={`Add material ${index + 1}`}
          placeholder="Enter the material name"
          options={materialData}
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
            type="number"
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
            options={field.options}
          />
        ))}
        <Label label="% (optional)" htmlFor="percentage" className={style.label}>
          <Input
            {...register('percentage')}
            type="number"
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
