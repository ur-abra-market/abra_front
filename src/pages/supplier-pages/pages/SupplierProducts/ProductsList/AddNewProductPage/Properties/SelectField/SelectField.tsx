import React, { FC } from 'react';

import {
  Controller,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { FIELDS_NEW_PRODUCT_INFO } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { IProductPropertiesValues } from 'store/reducers/supplier/other/types';
import { Input, Label, Select } from 'ui-kit';

import style from './Select.module.scss';

export interface ISelectField {
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  placeholder?: string;
  options: IProductPropertiesValues[];
  fieldId: number;
  hasOptional: boolean;
  onChangeFormHandler: (
    formName: FIELDS_NEW_PRODUCT_INFO,
    fieldName: string,
    idField: number,
    idMaterial: number,
    percentage?: number,
  ) => Promise<void>;
  getValues: UseFormGetValues<FieldValues>;
}

export const SelectField: FC<ISelectField> = ({
  register,
  name,
  label,
  placeholder,
  options,
  fieldId,
  hasOptional,
  onChangeFormHandler,
  getValues,
}) => {
  const { control } = useForm();

  const onChangeHandler = (value: string | number): void => {
    const field = options.find(el => el.id === value);
    const percentageValue =
      Number(getValues(`percentage${fieldId}`)) > 100
        ? 100
        : Number(getValues(`percentage${fieldId}`));

    if (field) {
      onChangeFormHandler(
        FIELDS_NEW_PRODUCT_INFO.productProperties,
        `${name}${fieldId}`,
        field.id,
        field.property_type_id,
        percentageValue,
      );
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
              placeholder={placeholder || 'Select'}
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
            placeholder="Enter percentage of material"
            className={style.percentage}
          />
        </Label>
      )}
    </div>
  );
};
