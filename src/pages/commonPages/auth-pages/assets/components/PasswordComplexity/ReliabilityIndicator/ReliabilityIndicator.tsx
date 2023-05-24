import React, { FC } from 'react';

import cn from 'classnames';

import style from './ReliabilityIndicator.module.scss';

interface IReliabilityIndicator {
  isValid?: boolean;
  text: string;
}

export const ReliabilityIndicator: FC<IReliabilityIndicator> = ({
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
