import React, { useEffect, useState } from "react";
import TextField from "../../common/textField";
// import RadioField from "../../common/radioField";
import Button from "../../common/buttons/button";
// import { validator } from "../../../utils/validator";
// import { showError } from "../../../utils/showError";
import style from "./registerForm.module.css"
import styleBtn from "../../common/buttons/buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "../../../store/reducers/registerSlice";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
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

  // const [data, setData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   additional_info: "",
  //   status: "",
  // });
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
  //   first_name: { isRequired: { message: "First name is required!" } },
  //   last_name: { isRequired: { message: "Second name is required!" } },
  //   phone: {
  //     isRequired: { message: "Phone number is required!" },
  //     isPhoneNumber: { message: "Enter the correct number!" },
  //   },
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
  //   setErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const isValid = Object.keys(errors).length === 0;

  const onSubmit = (data) => {
    // e.preventDefault();
    // const isValid = validate();
    if (!isValid) return;
    //console.log(data);
    dispatch(registerService(data));
    console.log(data);
  };

  const resServer = useSelector((state) => state.register.resMessage);

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

    <form action="" onSubmit={handleSubmit(onSubmit)}>
      {/* <TextField
        label="First name"
        name="first_name"
        value={data.first_name}
        showError={isDirty}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.first_name}
      />
      <TextField
        label="Second name"
        name="last_name"
        value={data.last_name}
        showError={isDirty}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.last_name}
      /> */}
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
      {/* <TextField
        label="Phone number"
        name="phone"
        type="tel"
        value={data.phone}
        showError={isDirty}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.phone}
      /> */}
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
        onChange={(s)=> {
          <div className={style.requirementsWrapper}>

            <div className={`${style.requirement} ${style.capitalLetter}`}>
              <div className={errors.password.type.capitalSymbol ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>1 capital letter</div>
            </div>

            <div className={style.requirement}>
              <div className={errors.password.type.digitSymbol ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>1 number</div>
            </div>
            <div className={style.requirement}>
              <div className={errors.password.type.minLength ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>8 symbols</div>
            </div>
            <div className={style.requirement}>
              <div className={errors.password.type.specialSymbol ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>!/#/+/*</div>
            </div>
          </div>
        }}
        // value={data.password}
        // showError={isDirty}
        // onBlur={handleBlur}
        // onChange={handleChange}
        // error={errors.password}
      />
      {/* <RadioField
        options={[
          { name: "Seller", value: "sellers" },
          { name: "Supplier", value: "suppliers" },
        ]}
        value={data.status}
        name="status"
        onChange={handleChange}
      /> */}
      {/* <div className={style.requirementsWrapper}>
          <div className={`${style.requirement} ${style.capitalLetter}`}>
              <div className={error.type.capitalSymbol ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>1 capital letter</div>
          </div>
          <div className={style.requirement}>
              <div className={errors.type.containsNumbers ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>1 number</div>
          </div>
          <div className={style.requirement}>
              <div className={errors.type.passwordLength ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>8 symbols</div>
          </div>
          <div className={style.requirement}>
              <div className={errors.type.containsSymbols ? `${style.requirementCheckmark} ${style.done}` : style.requirementCheckmark}></div>
              <div>!/#/+/*</div>
          </div>
      </div> */}
      <div>{resServer}</div>
      <Button
        value="Sign up"
        className={ (!isValid) ? 
          `${styleBtn.commonButton } ${styleBtn.logInBtnInactive}` : 
          `${styleBtn.commonButton } ${styleBtn.logInBtnActive}`}
        disabled={!isValid}
      />
    </form>
    </>
  );
};
export default RegisterForm;
