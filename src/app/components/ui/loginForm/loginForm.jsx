import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../common/textField";
import { Button } from "../../common/buttons";
import style from "../registerForm/registerForm.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";
import { loginService } from "../../../store/reducers/loginSlice";
import { useForm } from "react-hook-form";
import PasswordComplexity from "../../common/passwordComplexity/passwordComplexity";
import Form from "../../common/form/form";

const LoginForm = () => {
  const [userStatus, setUserStatus] = useState("suppliers");
  const dispatch = useDispatch();
  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const watchPasword = watch("password");

  const toggleUserStatus = () => {
    setUserStatus((prevState) =>
      prevState === "suppliers" ? "sellers" : "suppliers"
    );
  };

  const onSubmit = (data) => {
    if (!isValid) return;
    dispatch(loginService(data));
    console.log(data);
  };

  const resServer = useSelector((state) => state.login.resMessage);

  const textFieldClasses = {
    label: `${style.textFieldLabel}`, 
    inputWrapper: `${style.inputWrapper}`,
    input: `${style.textFieldInput}`
  }

  return (
    <>
      <div className={style.buySellBtnWrappeer}>
        <div className={style.flexContainer}>
          <Button
            value="I'm here to buy"
            className={
              userStatus === "suppliers"
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
          <Button
            value="I'm here to sell"
            className={
              userStatus === "sellers"
                ? styleBtn.userStatusBtnInactive
                : styleBtn.userStatusBtnActive
            }
            onClick={toggleUserStatus}
          />
        </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          register={register("email", {
            required: "Email is required!",
            pattern: {
              value: /^\S+@\S+\.\S+$/g,
              message: "Email is incorrect!",
            },
          })}
          label="Email"
          name="email"
          placeholder="Email"
          classes={textFieldClasses}
          error={errors.email}
        />
        <TextField
          register={register("password", {
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters!",
            },
            validate: {
              capitalSymbol: (s) => /[A-Z]+/g.test(s),
              digitSymbol: (s) => /\d+/g.test(s),
              specialSymbol: (s) => /[!#+*]/g.test(s),
            },
          })}
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          classes={textFieldClasses}
        />
        <PasswordComplexity valueOfNewPassword={watchPasword} />
        <div>{resServer}</div>
        <Button
          value="Log in"
          className={
            !isValid
              ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
              : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
          }
          disabled={!isValid}
        />
      </Form>
    </>
  );
};
export default LoginForm;
