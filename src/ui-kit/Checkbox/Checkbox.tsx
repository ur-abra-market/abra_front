import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './Checkbox.module.css';

export interface ICheckbox
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'size'
  > {
  variant?: 'notification' | 'default';
  label?: string;
  size?: 'md' | 'sm';
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckbox>((props, ref) => {
  const { label, variant, size = 'md', className, disabled, ...restProps } = props;

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
