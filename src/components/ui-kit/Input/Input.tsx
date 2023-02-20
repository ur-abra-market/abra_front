import { forwardRef, useState } from 'react';

import cn from 'classnames';

import { ReactComponent as Ice } from '../../../assets/img/icons/ice_c.svg';
import { IconButton } from '../IconButton/IconButton';

import styles from './Input.module.css';
import { InputProps } from './Input.props';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const {
      className,
      classNameWrapper,
      variant = 'primary',
      type = 'text',
      error,
      ...restProps
    } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickButton = (): void => setShowPassword(!showPassword);

    return (
      <div className={cn(styles.wrapper, classNameWrapper)}>
        <input
          className={cn(styles.input, className)}
          ref={ref}
          type={showPassword ? 'text' : type}
          {...restProps}
        />
        {error && <span className={styles.error}>{error}</span>}
        {variant === 'password' && (
          <IconButton className={styles.button} onClick={handleClickButton}>
            <Ice />
          </IconButton>
        )}
      </div>
    );
  },
);
