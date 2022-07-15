import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../common/textField";
import Button from "../../common/buttons/button";
// import { validator } from "../../../utils/validator";
// import { showError } from "../../../utils/showError";
import style from "../registerForm/registerForm.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";
import { loginService } from "../../../store/reducers/loginSlice";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [userStatus, setUserStatus] = useState("buyer");
  const dispatch = useDispatch();
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const toggleUserStatus = () => {
  setUserStatus((prevState) =>
      prevState === "buyer" ? "seller" : "buyer"
  );
};

  // const [data, setData] = useState({ email: "", password: "" });
  // const [errors, setErrors] = useState({});
  // const [isDirty, setIsDirty] = useState(false);

  // const handleBlur = ({ target }) => {
  //   const { name } = target;
  //   setIsDirty(showError(data, name));
  // };

  // const handleChange = ({ target }) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };

  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: "Email is required!" },
  //     isEmail: { message: "Email is incorrect!" },
  //   },
  //   password: {
  //     isRequired: { message: "Password is required!" },
  //     isCapitalSymbol: { message: "Password must contain a capital letter!" },
  //     isDigitSymbol: { message: "Password must contain a digit!" },
  //     min: {
  //       message: "Password must contain at least 8 characters!",
  //       value: 8,
  //     },
  //   },
  // };
  // useEffect(() => {
  //   validate();
  // }, [data]);

  // const validate = () => {
  //   const errors = validator(data, validatorConfig);
  //   // setErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const isValid = Object.keys(errors).length === 0;

  const onSubmit = (data) => {
    // const isValid = validate();
    if (!isValid) return;

    // console.log(data);
    dispatch(loginService(data));

    console.log(data)
  };

  const resServer = useSelector((state) => state.login.resMessage);
  return (
    <>
    <div className={style.buySellBtnWrappeer}>
      <div className={style.flexContainer}>
      <Button 
        value="I'm here to buy"
        className={userStatus === "buyer"
        ? styleBtn.userStatusBtnInactive
        : styleBtn.userStatusBtnActive}
        onClick={userStatus === "seller" ? toggleUserStatus: {}}

        />
        <Button 
        value="I'm here to sell"
        className={userStatus === "seller"
        ? styleBtn.userStatusBtnInactive
        : styleBtn.userStatusBtnActive}
        onClick={userStatus === "buyer" ? toggleUserStatus: {}}
        />
      </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
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
        error={errors.email}
        // value={data.email}
        // showError={isDirty}
        // onBlur={handleBlur}
        // onChange={handleChange}
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
        error={errors.password}
        // value={data.password}
        // showError={isDirty}
        // onBlur={handleBlur}
        // onChange={handleChange}
        // error={errors.password}
      />
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
    </form>
    </>
  );
};
export default LoginForm;
