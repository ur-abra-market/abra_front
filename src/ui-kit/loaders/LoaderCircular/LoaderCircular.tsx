import React, { FC } from 'react';

import cn from 'classnames';

import style from './LoaderCircular.module.scss';

export interface LoaderProps {
  variant?: 'circular-min';
  className?: string;
}
export const LoaderCircular: FC<LoaderProps> = ({ variant, className }): JSX.Element => {
  return (
    <div
      className={cn(className || style.loader, {
        [style.loader_min]: variant === 'circular-min',
      })}
    >
      <div
        className={cn(style.loader_indicator, {
          [style.loader_indicator_min]: variant === 'circular-min',
          [style.loader_local_indicator]: className,
        })}
      />
    </div>
  );
};
