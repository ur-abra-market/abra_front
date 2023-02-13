import { FC } from 'react';

import cn from 'classnames';

import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

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
