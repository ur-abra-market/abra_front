import { forwardRef } from 'react';

import cn from 'classnames';
import InputMask, { ReactInputMask } from 'react-input-mask';

import styles from './InputWithMask.module.css';
import { InputWithMaskProps } from './InputWithMask.props';

export const InputWithMask = forwardRef<ReactInputMask, InputWithMaskProps>(
  (props, ref) => {
    const { className, classNameWrapper, error, ...restProps } = props;

    return (
      <div className={cn(styles.wrapper, classNameWrapper)}>
        <InputMask className={cn(styles.input, className)} ref={ref} {...restProps} />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);
