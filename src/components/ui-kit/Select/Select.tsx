import { ChangeEvent, forwardRef } from 'react';

import cn from 'classnames';

import { ReactComponent as Arrow } from '../../../assets/img/icons/arrowRight.svg';

import styles from './Select.module.css';
import { SelectProps } from './Select.props';

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    options,
    error,
    children,
    onChangeOption,
    placeholder,
    ...restProps
  } = props;

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChangeOption?.(e.currentTarget.value);
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <select
        ref={ref}
        className={styles.select}
        {...restProps}
        onChange={onChangeCallback}
        placeholder={placeholder}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options &&
          options.map(({ label, value }, i) => {
            return (
              <option className={styles.option} key={i} value={value}>
                {label}
              </option>
            );
          })}
        {children}
      </select>
      <span className={styles.icon}>
        <Arrow className={styles.arrow} />
      </span>
      <span className={styles.error}>{error}</span>
    </div>
  );
});
