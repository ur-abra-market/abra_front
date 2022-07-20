import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./textField.module.css";
import eyeHiddenPassword from "../../../assets/img/icons/eye_hidden_password.png";
import eyeVisiblePassword from "../../../assets/img/icons/eye_visible_password.png";

const TextField = ({ label, id, type, name, error, register }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
    let findPassword = document.getElementById("password");
    findPassword.type = !showPassword ? "text" : "password";
  };


  console.log(error);
  return (
    <>
      <label htmlFor={name} className={style.labelTextField}>
        {" "}
        {label}{" "}
      </label>
      <div className={style.innerWrapper}>
        <input
          {...register}
          type={showPassword ? "text" : type}
          id={id}
          className={
            !(name === "password")
              ? style.inputTextField
              : style.inputTextFieldPassword
          }
          placeholder={label}
        />
        {name === "password" && (
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
};

export default TextField;
