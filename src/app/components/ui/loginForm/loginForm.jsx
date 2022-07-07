import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../common/textField";
import Button from "../../common/buttons/button";
import { validator } from "../../../utils/validator";
import { showError } from "../../../utils/showError";
import style from "../../common/buttons/buttons.module.css";
import { loginService } from "../../../store/reducers/loginSlice";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const dispatch = useDispatch();

  const handleBlur = ({ target }) => {
    const { name } = target;
    setIsDirty(showError(data, name));
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required!" },
      isEmail: { message: "Email is incorrect!" },
    },
    password: {
      isRequired: { message: "Password is required!" },
      isCapitalSymbol: { message: "Password must contain a capital letter!" },
      isDigitSymbol: { message: "Password must contain a digit!" },
      min: {
        message: "Password must contain at least 8 characters!",
        value: 8,
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    //console.log(data);
    dispatch(loginService(data));
  };

  const resServer = useSelector((state) => state.login.resMessage);
  return (
    <form action="" onSubmit={handSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        showError={isDirty}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        showError={isDirty}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password}
      />
      <div>{resServer}</div>
      <Button
        value="Log in my WB account"
        className={style.mainButton}
        disabled={!isValid}
      />
    </form>
  );
};
export default LoginForm;
