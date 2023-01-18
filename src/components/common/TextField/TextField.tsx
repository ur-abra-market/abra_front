import React, { useState } from 'react';

import PropTypes from 'prop-types';

import eyeHiddenPassword from '../../../assets/img/icons/eye_hidden_password.png';
import eyeVisiblePassword from '../../../assets/img/icons/eye_visible_password.png';

import style from './TextField.module.css';

const TextField = props => {
  const { label, id, type, name, placeholder, error, register, classes } = props;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = e => {
    e.preventDefault();
    setShowPassword(prevState => !prevState);
    const findPassword = document.getElementById('password');

    findPassword.type = !showPassword ? 'text' : 'password';
  };

  return (
    <>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <div className={classes.inputWrapper}>
        <input
          {...register}
          type={showPassword ? 'text' : type}
          id={id}
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
      {error && <div className={style.error}>{error.message}</div>}
    </>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
};

export default TextField;
