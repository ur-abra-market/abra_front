import React, { useState } from "react";
import TextField from "../../common/textField";
import Button from "../../common/buttons/button";
import style from "./registerForm.module.css"
import styleBtn from "../../common/buttons/buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "../../../store/reducers/registerSlice";
import { useForm } from "react-hook-form";
import PasswordComplexity from "../../common/passwordComplexity/passwordComplexity";

const RegisterForm = () => {
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
//   const toggleUserStatus = () => {
//     // e.preventDefault();
//     // value === "I'm here to buy" ? userStatus=setUserStatus("suppliers") : userStatus=setUserStatus("sellers")
//     console.log("value")
//     // setUserStatus((prevState) =>
//     //     prevState === "suppliers" ? "sellers" : "suppliers"
//     // );
// };

  const onSubmit = (data) => {
    if (!isValid) return;
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
        className={userStatus === "suppliers"
        ? styleBtn.userStatusBtnInactive
        : styleBtn.userStatusBtnActive}
        onClick={userStatus === "sellers" ? toggleUserStatus: {}}
        // onClick={toggleUserStatus}
        // onClick={()=> console.log(Button.value)}
        // onClick={(target) => target.value==="I'm here to buy"? setUserStatus("suppliers"):{}}
        // onClick={() => {console.log(userStatus); setUserStatus("suppliers"); console.log(userStatus)}}
        // onClick={(e) => alert(e.target.value)}


        />
        <Button 
        value="I'm here to sell"
        className={userStatus === "sellers"
        ? styleBtn.userStatusBtnInactive
        : styleBtn.userStatusBtnActive}
        onClick={userStatus === "suppliers" ? toggleUserStatus: {}}
        // onClick={(e)=>toggleUserStatus(e)}
        // onClick={()=> console.log(Button.value)}
        // onClick={(target) => target.value==="I'm here to buy"? setUserStatus("sellers"):{}}
        // onClick={() => {console.log(userStatus); setUserStatus("sellers"); console.log(userStatus)}}
        // onClick={(e) => alert(e.target.value)}


        />
      </div>
    </div>

    <form action="" onSubmit={handleSubmit(onSubmit)}>
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
      />
      <TextField
        register={register("password", 
        {
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
        }
        )}
        label="Password"
        type="password"
        id="password"
        name="password"
        // error={errors.password}
      />
      <PasswordComplexity valueOfNewPassword={watchPasword}/>
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
