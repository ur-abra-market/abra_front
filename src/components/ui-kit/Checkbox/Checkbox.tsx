import React, { forwardRef } from 'react';

import cn from 'classnames';

import styles from './Checkbox.module.css';
import { CheckboxProps } from './Checkbox.props';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, variant, size = 'md', className, ...restProps } = props;

  return (
    <label className={cn(styles.label, className)}>
      <input
        ref={ref}
        type="checkbox"
        className={cn({
          [styles.input_notification]: variant === 'notification',
          [styles.input_default]: variant === 'default',
          [styles.md]: variant === 'notification' && size === 'md',
          [styles.sm]: variant === 'notification' && size === 'sm',
        })}
        {...restProps}
      />
      {label}
    </label>
  );
});
