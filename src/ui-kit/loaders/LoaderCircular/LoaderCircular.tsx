import React, { FC } from 'react';

import cn from 'classnames';

import style from './LoaderCircular.module.css';

export interface LoaderProps {
  variant?: 'circular-min';
}
export const LoaderCircular: FC<LoaderProps> = ({ variant }): JSX.Element => {
  return (
    <div
      className={cn(style.loader, {
        [style.loader_min]: variant === 'circular-min',
      })}
    >
      <div
        className={cn(style.loader_indicator, {
          [style.loader_indicator_min]: variant === 'circular-min',
        })}
      />
    </div>
  );
};
