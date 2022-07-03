import React, { useEffect, useState } from "react";
import TextField from "../../commonComponents/textField";
import Button from "../../commonComponents/buttons/button";
import { validator } from "../../../utils/validator";
import style from "../../commonComponents/buttons/buttons.module.css";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: { 
        isRequired: {message: "Email is required!"},
        isEmail: {message: "Email is incorrect!"},
    },
    password:{ 
        isRequired: {message: "Password is required!"},
        isCapitalSymbol: {message: "Password must contain a capital letter!"},
        isDigitSymbol: {message: "Password must contain a digit!"},
        min: {message: "Password must contain at least 8 characters!",
            value: 8},
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
    console.log(data);
  };

  return (
    <form action="" onSubmit={handSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Button 
        value="Log in my WB account" 
        className={style.mainButton} 
        disabled={!isValid}/>
    </form>
  );
};
export default LoginForm;
