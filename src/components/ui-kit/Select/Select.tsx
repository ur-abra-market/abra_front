import { forwardRef } from 'react';

import cn from 'classnames';

import { ReactComponent as Arrow } from '../../../assets/img/icons/arrowRight.svg';

import styles from './Select.module.css';
import { SelectProps } from './Select.props';

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, options, error, children, ...restProps } = props;

  return (
    <div className={cn(styles.wrapper, className)}>
      <select ref={ref} className={styles.select} {...restProps}>
        {options &&
          options.map(({ label, value }) => {
            return (
              <option className={styles.option} key={`${label}`} value={value}>
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
