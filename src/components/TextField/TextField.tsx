import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'

import eyeHiddenPassword from '../../assets/img/icons/eye_hidden_password.png'
import eyeVisiblePassword from '../../assets/img/icons/eye_visible_password.png'

import style from './TextField.module.css'

interface TextFieldProps {
  label?: string
  name?: string
  id?: string
  type?: string
  register?: any
  error?: any
  placeholder?: string
  classes?: any
  defaultValue?: string
  onChange?: Function

  inputProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}
const TextField: FC<TextFieldProps> = (props): JSX.Element => {
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
    onChange
  } = props

  const [showPassword, setShowPassword] = useState(false)
  // TODO переделать!!!
  const toggleShowPassword = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault()
    setShowPassword((prevState) => !prevState)
    const findPassword = document.getElementById('password')

    if (findPassword) {
      findPassword.setAttribute('type', !showPassword ? 'text' : 'password')
    }
  }

  return (
    <div className={style.field_with_error_wrapper}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      {error && <div className={classes.error}>{error.message}</div>}
      <div className={classes.inputWrapper}>
        <input
          onChange={onChange}
          type={showPassword ? 'text' : type}
          id={id}
          defaultValue={defaultValue}
          className={
            // eslint-disable-next-line no-nested-ternary
            name !== 'password'
              ? classes.input
              : classes.password
              ? classes.password.inputTextFieldPassword
              : style.input_text_field_password
          }
          placeholder={placeholder}
          {...inputProps}
          {...register}
        />
        {name === 'password' && (
          <div
            role="presentation"
            className={style.show_password_btn}
            onClick={(e) => toggleShowPassword(e)}
          >
            {showPassword ? (
              <img
                src={eyeVisiblePassword}
                alt="eyeVisiblePassword"
                className={style.show_password_btn_img}
              />
            ) : (
              <img
                src={eyeHiddenPassword}
                alt="eyeHiddenPassword"
                className={style.show_password_btn_img}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TextField
