import React, { FC, useState } from 'react';

import { Label, Select } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';
import style from '../ProductListRegistrationForm/ProductListRegistrationForm.module.css';

interface SelectionsForPropertiesProps {
  element: any;
  register: any;
  options: IOption[];
}
const SelectionsForProperties: FC<SelectionsForPropertiesProps> = ({
  element,
  register,
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

  return (
    <div className={style.select_inputs}>
      <div className={style.select_equal}>
        {/* <p className={s.select_title}>{ucFirst(`${element.key}`)}</p> */}
        <div className={style.select_container}>
          <Label label={`${element.key}`}>
            <Select
              options={options}
              {...register(`${element.key}`, {
                required: true,
              })}
              onChangeOption={setCurrentValue}
              placeholder="Select"
            />
          </Label>
        </div>
      </div>

      {!!arrFilteredOptValues.length && (
        <div className={style.select_equal}>
          <div className={style.select_container}>
            <Label label={`${element.key}(optional)`}>
              <Select
                placeholder="Select"
                options={OPTIONAL_PROPERTIES_DATA}
                {...register(`${element.key}(optional)`, {
                  required: true,
                })}
              />
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionsForProperties;
