import React, { FC } from 'react';

import PropTypes, { string } from 'prop-types';

import style from './RadioField.module.css';

interface RadioFieldProps {
  options: any[];
  name: string;
  onChange: any;
  value: string;
}

const RadioField: FC<RadioFieldProps> = ({
  options,
  name,
  onChange,
  value,
}): JSX.Element => {
  return (
    <div className={style.labelWrapper}>
      {options.map(option => (
        <div key={`${option.name}_${option.value}`}>
          <input
            type="radio"
            name={name}
            value={option.value}
            id={`${option.name}_${option.value}`}
            checked={option.value === value}
            onChange={onChange}
          />
          <label htmlFor={`${option.name}_${option.value}`}>{option.name}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioField;
