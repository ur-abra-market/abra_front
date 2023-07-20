import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import style from './Checkbox.module.scss';

export interface ICheckbox
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  variant?: 'notification' | 'default';
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
  ({ label, variant, className, disabled, ...restProps }, ref): JSX.Element => {
    const labelClasses = cn(style.label, className);
    const inputClasses = cn({
      [style.input_notification]: variant === 'notification',
      [style.input_default]: variant === 'default',
    });

    return (
      <label className={labelClasses}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={inputClasses}
          {...restProps}
        />
        {label}
      </label>
    );
  },
);
