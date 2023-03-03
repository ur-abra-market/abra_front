import React, { FC } from 'react';

import { ucFirst } from '../../utils/ucFirst';

import style from './RadioStyledElem.module.css';

interface RadioStyledElemProps {
  name: string;
  value: string;
  choice: string;
  register?: any;
  setChoice: any;
  typeId: number;
}
const RadioStyledElem: FC<RadioStyledElemProps> = ({
  name,
  value,
  choice,
  register,
  setChoice,
  typeId,
}): JSX.Element => {
  const colorValue = ucFirst(value);

  const valueStr = value.split(' ').join('');

  // TODO - переделать!!!
  const onClickChoiceColorHandler = (e: any): void => {
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

export default RadioStyledElem;
