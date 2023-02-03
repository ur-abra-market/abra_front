import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from './TextField.module.css'
import eyeHiddenPassword from '../../../assets/img/icons/eye_hidden_password.png'
import eyeVisiblePassword from '../../../assets/img/icons/eye_visible_password.png'

const TextField = (props) => {
  const {
    label,
    id,
    type,
    name,
    placeholder,
    error,
    register,
    classes,
    defaultValue,
    onChange
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword((prevState) => !prevState)
    let findPassword = document.getElementById('password')
    findPassword.type = !showPassword ? 'text' : 'password'
  }

  return (
    <>
      <div className={style.fieldWithErrorWrapper}>
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
        {error && <div className={classes.error}>{error.message}</div>}
        <div className={classes.inputWrapper}>
          <input
            onChange={onChange}
            {...register}
            type={showPassword ? 'text' : type}
            id={id}
            defaultValue={defaultValue}
            className={
              !(name === 'password')
                ? classes.input
                : classes.password
                ? classes.password.inputTextFieldPassword
                : style.inputTextFieldPassword
            }
            placeholder={placeholder}
          />
          {name === 'password' && (
            <div className={style.showPasswordBtn} onClick={toggleShowPassword}>
              {showPassword ? (
                <img
                  src={eyeVisiblePassword}
                  alt="eyeVisiblePassword"
                  className={style.showPasswordBtn_img}
                ></img>
              ) : (
                <img
                  src={eyeHiddenPassword}
                  alt="eyeHiddenPassword"
                  className={style.showPasswordBtn_img}
                ></img>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
}

export default TextField
