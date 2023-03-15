import React, { FC } from 'react';

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
  /* const [currentValue, setCurrentValue] = useState('');

   const arrFilteredOptValues = element.values
    .filter(
      (el: { value: string; optional_value: null }) =>
        el.value === currentValue && el.optional_value !== null,
    )
    .map((el: { optional_value: any }) => el.optional_value); */

  /* <Select
    placeholder="Select"
    options={options}
    {...register(`${element.key}`, {
      required: true,
      onChange: (e: any) => {
        setCurrentValue(e.target.value);
      },
    })}
  /> */

  return (
    <div className={style.select_inputs}>
      <div className={style.select_equal}>
        {/* <p className={s.select_title}>{ucFirst(`${element.key}`)}</p> */}
        <div className={style.select_container}>
          <Label label={`${element.key}`}>
            <Select
              placeholder="Select"
              options={options}
              {...register(`${element.key}`, {
                required: true,
              })}
            />
          </Label>
        </div>
      </div>

      {/* {!!arrFilteredOptValues.length && (
        <div className={style.select_equal}>
          <p className={s.select_title}>{ucFirst(`${element.key}(optional)`)}</p>
          <div className={s.select_container}>
            <select {...register(`${element.key}(optional)`)} className={s.select_field}>
              <option hidden value="">
                Select
              </option>

              {arrFilteredOptValues.map((el: any, i: number) => (
                <option key={i} className={s.select_option} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <span className={s.select_arrow}>&#9660;</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SelectionsForProperties;
