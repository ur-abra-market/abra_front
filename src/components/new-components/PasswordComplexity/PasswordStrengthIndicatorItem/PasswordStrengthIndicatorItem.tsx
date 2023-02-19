import React, { FC } from 'react';

import cn from 'classnames';

import style from './PasswordStrengthIndicatorItem.module.css';

interface PasswordStrengthIndicatorItemProps {
  isValid?: boolean;
  text: string;
}
const PasswordStrengthIndicatorItem: FC<PasswordStrengthIndicatorItemProps> = ({
  isValid = false,
  text,
}): JSX.Element => {
  return (
    <div className={style.requirement}>
      <div
        className={cn({
          [style.requirement_met]: isValid,
          [style.requirement_not_met]: !isValid,
        })}
      />
      <div>{text}</div>
    </div>
  );
};

export default PasswordStrengthIndicatorItem;
