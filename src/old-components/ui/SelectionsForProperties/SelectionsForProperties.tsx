import React, { FC, useState } from 'react';

import { Control, Controller } from 'react-hook-form';

import styles from './SelectionsForProperties.module.scss';

import style from 'old-components/ui/ProductListRegistrationForm/ProductListRegistrationForm.module.scss';
import { ISelectOption, Label, Select } from 'ui-kit';

interface ISelectionsForPropertiesProps {
  control: Control<any>;
  element: any;
  options: ISelectOption[];
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

  const OPTIONAL_PROPERTIES_DATA: ISelectOption[] = arrFilteredOptValues.map(
    (el: any) => {
      return { label: el, value: el };
    },
  );

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
                  className={styles.select}
                  onChange={value => {
                    field.onChange(value.value);
                    handleSetCurrentValue(value.label.text);
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
