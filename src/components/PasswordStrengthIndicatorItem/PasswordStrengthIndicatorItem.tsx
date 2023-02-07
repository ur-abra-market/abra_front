import React, { FC } from 'react';

import style from './PasswordStrengthIndicatorItem.module.css';

interface PasswordStrengthIndicatorItemProps {
  isValid: boolean;
  text: string;
}
const PasswordStrengthIndicatorItem: FC<PasswordStrengthIndicatorItemProps> = ({
  isValid,
  text,
}): JSX.Element => {
  return (
    <div className={style.requirement}>
      <div className={isValid ? style.requirementMet : style.requirementNotMet} />
      <div>{text}</div>
    </div>
  );
};

export default PasswordStrengthIndicatorItem;
