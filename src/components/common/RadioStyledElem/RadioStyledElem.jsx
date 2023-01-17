import React from 'react';

import PropTypes from 'prop-types';

import { ucFirst } from '../../../utils/ucFirst';

import style from './RadioStyledElem.module.css';

const RadioStyledElem = ({ name, value, choice, register, setChoice, typeId }) => {
  const colorValue = ucFirst(value);

  const valueStr = value.split(' ').join('');

  const onClickChoiceColorHandler = e => {
    setChoice(e.target.value);
  };

  return (
    <div className={style.colorWrapper}>
      <input
        type="radio"
        {...register(`${typeId}-${name}`, {
          required: true,
        })}
        onClick={onClickChoiceColorHandler}
        value={value}
        className={`${style[name]}`}
      />

      {name === 'color' && (
        <div
          className={`${value === choice && style.borderContainer} ${
            style.colorContainer
          }`}
        >
          <div
            style={{ background: `${valueStr}` }}
            className={`${style.colorBlock}  `}
          />
          <p className={style.colorValue}>{colorValue}</p>
        </div>
      )}

      {/* {name === 'growth' && <div className={`${value === choice && style.borderContainer} ${style.growthContainer}`}>
                <p className={style.growthValue}>{colorValue}</p>
            </div>} */}
    </div>
  );
};

RadioStyledElem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  choice: PropTypes.string,
  register: PropTypes.func,
  setChoice: PropTypes.func,
  typeId: PropTypes.number,
};

export default RadioStyledElem;
