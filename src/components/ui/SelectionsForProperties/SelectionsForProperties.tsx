import React, { FC, useState } from 'react';

import { ucFirst } from '../../../utils/ucFirst';
import s from '../../SelectLabelAbove/SelectLabelAbove.module.css';
import style from '../ProductListRegistrationForm/ProductListRegistrationForm.module.css';

interface SelectionsForPropertiesProps {
  element: any;
  register: any;
  options: any[];
}
const SelectionsForProperties: FC<SelectionsForPropertiesProps> = ({
  element,
  register,
  options,
}) => {
  const [currentValue, setCurrentValue] = useState('');

  const arrFilteredOptValues = element.values
    .filter(
      (el: { value: string; optional_value: null }) =>
        el.value === currentValue && el.optional_value !== null,
    )
    .map((el: { optional_value: any }) => el.optional_value);

  return (
    <div className={style.selectInputs}>
      <div className={style.selectEqual}>
        <p className={s.selectTitle}>{ucFirst(`${element.key}`)}</p>
        <div className={s.selectContainer}>
          <select
            {...register(`${element.key}`, {
              required: true,
              onChange: (e: any) => {
                setCurrentValue(e.target.value);
              },
            })}
            className={s.selectField}
          >
            <option hidden value="">
              Select
            </option>

            {options.map((el, i) => (
              <option key={i} className={s.selectOption} value={el}>
                {el}
              </option>
            ))}
          </select>
          <span className={s.selectArrow}>&#9660;</span>
        </div>
      </div>

      {!!arrFilteredOptValues.length && (
        <div className={style.selectEqual}>
          <p className={s.selectTitle}>{ucFirst(`${element.key}(optional)`)}</p>
          <div className={s.selectContainer}>
            <select {...register(`${element.key}(optional)`)} className={s.selectField}>
              <option hidden value="">
                Select
              </option>

              {arrFilteredOptValues.map((el: any, i: number) => (
                <option key={i} className={s.selectOption} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <span className={s.selectArrow}>&#9660;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionsForProperties;
