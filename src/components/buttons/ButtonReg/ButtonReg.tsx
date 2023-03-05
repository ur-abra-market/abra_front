import React, { FC } from 'react';

import style from './ButtonReg.module.css';

interface ButtonRegProps {
  type: 'button' | 'submit';
  value: string;
  isValid: boolean;
}
const ButtonReg: FC<ButtonRegProps> = ({ type, value, isValid }): JSX.Element => {
  return (
    <div>
      <button
        /* eslint-disable-next-line react/button-has-type */
        type={type}
        className={isValid ? style.button_off : style.button_on}
        disabled={isValid}
      >
        {value}
      </button>
    </div>
  );
};

export default ButtonReg;
