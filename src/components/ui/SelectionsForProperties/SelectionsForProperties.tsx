import React, { FC, useState } from 'react';

import { Control, Controller } from 'react-hook-form';

import { IOption, Label, Select } from '../../ui-kit';
import style from '../ProductListRegistrationForm/ProductListRegistrationForm.module.css';

import styles from './SelectionsForProperties.module.css';

interface ISelectionsForPropertiesProps {
  control: Control<any>;
  element: any;
  options: IOption[];
}

const SelectionsForProperties: FC<ISelectionsForPropertiesProps> = ({
  control,
  element,
  options,
}) => {
  const [currentValue, setCurrentValue] = useState('');

  const arrFilteredOptValues = element.values
    .filter(
      (el: { value: string; optional_value: null | string }) =>
        el.value === currentValue && el.optional_value !== null,
    )
    .map((el: { optional_value: any }) => el.optional_value);

  const OPTIONAL_PROPERTIES_DATA: IOption[] = arrFilteredOptValues.map((el: any) => {
    return { label: el, value: el };
  });

  const handleSetCurrentValue = (value: string): void => {
    setCurrentValue(value);
  };

  return (
    <div className={style.select_inputs}>
      <div className={style.select_equal}>
        {/* <p className={s.select_title}>{ucFirst(`${element.key}`)}</p> */}
        <div className={style.select_container}>
          <Controller
            control={control}
            name={element.key}
            render={({ field }) => (
              <Label label={`${element.key}`}>
                <Select
                  options={options}
                  placeholder="Select"
                  padding="23px"
                  className={styles.select}
                  onChange={value => {
                    field.onChange(value.value);
                    handleSetCurrentValue(value.label);
                  }}
                />
              </Label>
            )}
          />
        </div>
      </div>
      {!!arrFilteredOptValues.length && (
        <div className={style.select_equal}>
          <div className={style.select_container}>
            <Controller
              control={control}
              name={`${element.key}(optional)`}
              render={({ field }) => (
                <Label label={`${element.key}(optional)`}>
                  <Select
                    options={OPTIONAL_PROPERTIES_DATA}
                    placeholder="Select"
                    padding="23px"
                    className={styles.select}
                    onChange={value => {
                      field.onChange(value.value);
                    }}
                  />
                </Label>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionsForProperties;
