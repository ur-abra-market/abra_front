import React, { useEffect, useState } from "react";
import TextField from "../../commonComponents/textField";
import RadioField from "../../commonComponents/radioField";
import Button from "../../commonComponents/buttons/button";
import { validator } from "../../../utils/validator";
import styleBtn from "../../commonComponents/buttons/buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../../store/user";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const resError = useSelector(getAuthErrors());
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    additional_info: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    first_name: { isRequired: { message: "First name is required!" } },
    last_name: { isRequired: { message: "Second name is required!" } },
    phone: {
      isRequired: { message: "Phone number is required!" },
      isPhoneNumber: { message: "Enter the correct number!" },
    },
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
    dispatch(signUp(data));
  };

  return (
    <form action="" onSubmit={handSubmit}>
      <TextField
        label="First name"
        name="first_name"
        value={data.first_name}
        onChange={handleChange}
        error={errors.first_name}
      />
      <TextField
        label="Second name"
        name="last_name"
        value={data.last_name}
        onChange={handleChange}
        error={errors.last_name}
      />
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Phone number"
        name="phone"
        type="tel"
        value={data.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <RadioField
        options={[
          { name: "Seller", value: "seller" },
          { name: "Supplier", value: "supplier" },
        ]}
        value={data.status}
        name="status"
        onChange={handleChange}
      />

      <Button
        value="Continue"
        className={styleBtn.mainButton}
        disabled={!isValid}
      />
      {resError ? <p>{resError}</p> : ""}
    </form>
  );
};
export default RegisterForm;
