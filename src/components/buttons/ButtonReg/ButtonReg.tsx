import React from 'react';

import PropTypes from 'prop-types';

import style from './ButtonReg.module.css';

const ButtonReg = ({ type, value, isValid }): JSX.Element => {
  return (
    <div>
      <button
        type={type}
        className={isValid ? style.buttonOff : style.buttonOn}
        disabled={isValid}
      >
        {value}
      </button>
    </div>
  );
};

ButtonReg.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  isValid: PropTypes.bool,
};
export default ButtonReg;
