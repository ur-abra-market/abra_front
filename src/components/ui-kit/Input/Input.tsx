import { forwardRef } from 'react';

import cn from 'classnames';

import styles from './Input.module.css';
import { InputProps } from './Input.props';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const { className, classNameWrapper, type = 'text', error, ...restProps } = props;

    return (
      <div className={cn( classNameWrapper)}>
        <input
          className={cn(styles.input, className)}
          ref={ref}
          type={type}
          {...restProps}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);
