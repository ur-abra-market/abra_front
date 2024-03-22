import React, { FC } from 'react';

import {
  Controller,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { useDatabase } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/hooks/useDatabase';
import { IProductProperties } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { IProductPropertiesValues } from 'store/reducers/supplier/other/types';
import { Input, Label, Select } from 'ui-kit';

import style from './Select.module.scss';

export interface ISelectField {
  defaultValue: string;
  defaultOptionValue: string | number;
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  placeholder?: string;
  options: IProductPropertiesValues[];
  fieldId: number;
  hasOptional: boolean;
  onChangeFormHandler: (productProperties: IProductProperties) => Promise<void>;
  getValues: UseFormGetValues<FieldValues>;
}

export const SelectField: FC<ISelectField> = ({
  defaultValue,
  defaultOptionValue,
  register,
  name,
  label,
  options,
  fieldId,
  hasOptional,
  onChangeFormHandler,
  getValues,
}) => {
  const { control } = useForm();
  const { selectedCategoryIdOfDatabase } = useDatabase();
  const optionValue =
    typeof defaultOptionValue === 'number'
      ? String(defaultOptionValue)
      : 'Enter percentage of material';

  const onChangeHandler = async (id: string | number): Promise<void> => {
    const foundValue = options.find(el => el.id === id);
    const percentageValue = Math.min(Number(getValues(`percentage${fieldId}`)), 100);

    if (foundValue && selectedCategoryIdOfDatabase) {
      const propertyData: IProductProperties = {
        value: foundValue.value,
        id: foundValue.id,
        property_type_id: foundValue.property_type_id,
        categoryId: selectedCategoryIdOfDatabase,
      };

      if (hasOptional) {
        propertyData.optionalValue = percentageValue;
      }
      await onChangeFormHandler(propertyData);
    }
  };

  return (
    <div className={style.select_field_container}>
      <Label label={label} htmlFor={name} className={style.label}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...register(`${name}${fieldId}`)}
              {...field}
              placeholder={defaultValue}
              className={style.select_input}
              options={
                options &&
                options.map(el => ({ value: el.id, label: { text: el.value } }))
              }
              onChange={value => {
                onChangeHandler(value.value);
              }}
            />
          )}
        />
      </Label>
      {hasOptional && (
        <Label label="% (optional)" htmlFor="percentage" className={style.label}>
          <Input
            {...register(`percentage${fieldId}`, {
              onChange: event => {
                if (Number(event.target.value) > 100) {
                  event.target.value = 100;
                }

                return onChangeHandler(fieldId);
              },
            })}
            type="number"
            placeholder={optionValue}
            className={style.percentage}
          />
        </Label>
      )}
    </div>
  );
};
