import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import cn from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'type'
  > {
  type?: 'submit' | 'button';
  label?: string;
  color?: 'default' | 'red' | 'light-red' | 'white' | 'black';
}

export const Button: FC<ButtonProps> = (props): JSX.Element => {
  const {
    className,
    label,
    color = 'default',
    children,
    type = 'button',
    ...restProps
  } = props;

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(
        styles.button,
        {
          [styles.default]: color === 'default',
          [styles.red]: color === 'red',
          [styles.light_red]: color === 'light-red',
          [styles.white]: color === 'white',
          [styles.black]: color === 'black',
        },
        className,
      )}
      {...restProps}
    >
      {label}
      {children}
    </button>
  );
};
