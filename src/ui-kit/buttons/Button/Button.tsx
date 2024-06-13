import React, { ComponentPropsWithoutRef, ElementType, FC } from 'react';

import cn from 'classnames';

import styles from './Button.module.scss';

export type ButtonProps<T extends ElementType = 'button'> = {
  label?: string;
  color?: 'default' | 'red' | 'light-red' | 'white' | 'black' | 'outline';
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & { as?: T },
): JSX.Element => {
  const {
    className,
    as: Component = 'button',
    label,
    color = 'default',
    children,
    ...restProps
  } = props;

  const classNames = cn(
    styles.button,
    {
      [styles.default]: color === 'default',
      [styles.red]: color === 'red',
      [styles.light_red]: color === 'light-red',
      [styles.white]: color === 'white',
      [styles.black]: color === 'black',
      [styles.outline]: color === 'outline',
    },
    className,
  );

  return (
    <Component className={classNames} {...restProps}>
      {label}
      {children}
    </Component>
  );
};
