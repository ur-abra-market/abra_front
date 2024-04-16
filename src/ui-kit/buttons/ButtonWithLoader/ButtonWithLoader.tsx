import React, { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import cn from 'classnames';

import styles from './ButtonWithLoader.module.scss';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'type'
  > {}

export const ButtonWithLoader: FC<ButtonProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <button
      className={cn(styles.button, styles.default, className)}
      {...restProps}
      type="button"
    >
      <div className={cn(styles.loader_indicator)} />
    </button>
  );
};
