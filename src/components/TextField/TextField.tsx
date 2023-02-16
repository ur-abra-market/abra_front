import React, { DetailedHTMLProps, FC, forwardRef, HTMLAttributes, useState } from 'react';

import eyeHiddenPassword from '../../assets/img/icons/eye_hidden_password.png';
import eyeVisiblePassword from '../../assets/img/icons/eye_visible_password.png';

import style from './TextField.module.css';

interface TextFieldProps {
  label?: string;
  name?: string;
  id?: string;
  type?: string;
  register?: any;
  error?: any;
  placeholder?: string;
  classes?: any;
  defaultValue?: string;
  onChange?: Function;

  inputProps?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
const TextField: FC<TextFieldProps> = forwardRef(({ ...props }, ref) => {
  const {
    label,
    id,
    type,
    name,
    placeholder,
    register,
    error,
    inputProps,
    classes,
    defaultValue,
    onChange,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  // TODO переделать!!!
  const toggleShowPassword = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault();
    setShowPassword(prevState => !prevState);
    const findPassword = document.getElementById('password');

    if (findPassword) {
      findPassword.setAttribute('type', !showPassword ? 'text' : 'password');
    }
  };

  return (
    <div className={style.fieldWithErrorWrapper}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      {error && <div className={classes.error}>{error.message}</div>}
      <div className={classes.inputWrapper}>
        <input
          onChange={onChange}
          type={showPassword ? 'text' : type}
          id={id}
          ref ={ref}
          defaultValue={defaultValue}
          className={
            // eslint-disable-next-line no-nested-ternary
            name !== 'password'
              ? classes.input
              : classes.password
              ? classes.password.inputTextFieldPassword
              : style.inputTextFieldPassword
          }
          placeholder={placeholder}
          {...inputProps}
          {...register}
        />
        {name === 'password' && (
          <div
            role="presentation"
            className={style.showPasswordBtn}
            onClick={e => toggleShowPassword(e)}
          >
            {showPassword ? (
              <img
                src={eyeVisiblePassword}
                alt="eyeVisiblePassword"
                className={style.showPasswordBtn_img}
              />
            ) : (
              <img
                src={eyeHiddenPassword}
                alt="eyeHiddenPassword"
                className={style.showPasswordBtn_img}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
)
export default TextField;
