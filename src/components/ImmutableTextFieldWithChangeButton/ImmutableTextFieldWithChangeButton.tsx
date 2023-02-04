import React from 'react';

import PropTypes from 'prop-types';

import style from './ImmutableTextFieldWithChangeButton.css';

const ImmutableTextFieldWithChangeButton = props => {
  const { label, id, type, name, placeholder, register, classes, defaultValue } = props;

  // const [showPassword, setShowPassword] = useState(false)

  // const toggleShowPassword = (e) => {
  //   e.preventDefault()
  //   setShowPassword((prevState) => !prevState)
  //   let findPassword = document.getElementById('password')
  //   findPassword.type = !showPassword ? 'text' : 'password'
  // }

  return (
    <>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <div className={classes.inputWrapper}>
        <input
          {...register}
          type={type}
          // type={showPassword ? 'text' : type}
          id={id}
          value={defaultValue}
          className={
            !(name === 'password')
              ? classes.input
              : classes.password
              ? classes.password.inputTextFieldPassword
              : style.inputTextFieldPassword
          }
          placeholder={placeholder}
          readOnly
        />
        <div className={classes.changeBtnWrapper}>
          <button className={classes.changeBtn}>Change</button>
        </div>
      </div>
    </>
  );
};

ImmutableTextFieldWithChangeButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.object,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default ImmutableTextFieldWithChangeButton;
