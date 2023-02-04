import React from 'react';

import PropTypes from 'prop-types';

import style from './PasswordStrengthIndicatorItem.module.css';

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
  return (
    <div className={style.requirement}>
      <div className={isValid ? style.requirementMet : style.requirementNotMet} />
      <div>{text}</div>
    </div>
  );
};

PasswordStrengthIndicatorItem.propTypes = {
  isValid: PropTypes.bool,
  text: PropTypes.string,
};

export default PasswordStrengthIndicatorItem;
