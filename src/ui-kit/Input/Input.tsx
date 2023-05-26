import { forwardRef, useState, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import cn from 'classnames';
import { ButtonIcon } from '../buttons/ButtonIcon/ButtonIcon';
import styles from './Input.module.css';

import { EyeHiddenIcon } from 'assets/icons';

export interface IInput
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  classNameWrapper?: string;
  error?: string;
  type?: 'text' | 'textarea' | 'password' | 'date';
  variant?: 'primary' | 'password';
}

export const Input = forwardRef<HTMLInputElement, IInput>((props, ref): JSX.Element => {
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
        className={cn(
          styles.input,
          {
            [styles.input_error]: error,
          },
          className,
        )}
        ref={ref}
        type={showPassword ? 'text' : type}
        {...restProps}
      />
      {error && <span className={styles.error}>{error}</span>}
      {variant === 'password' && (
        <ButtonIcon className={styles.button} onClick={handleClickButton}>
          <EyeHiddenIcon />
        </ButtonIcon>
      )}
    </div>
  );
});
