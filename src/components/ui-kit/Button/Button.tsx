import { FC } from 'react';

import cn from 'classnames';

import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

export const Button: FC<ButtonProps> = (props): JSX.Element => {
  const { className, label, children, type = 'button', ...restProps } = props;

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(styles.button, className)}
      {...restProps}
    >
      {label}
      {children}
    </button>
  );
};
