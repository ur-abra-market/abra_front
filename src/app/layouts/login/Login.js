import React, { useState } from "react";
import LoginForm from "../../components/ui/loginForm/loginForm";
import RegisterForm from "../../components/ui/registerForm/registerForm";
import Button from "../../components/commonComponents/buttons/button";
import style from "../login/login.module.css";
import styleBtn from "../../components/commonComponents/buttons/buttons.module.css";

const Login = () => {
  const [formType, setFormType] = useState("login");

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className={style.logInPage}>
      {formType === "register" ? (
        <>
          <h1 className={style.header}>Registration</h1>
          <div className={style.logInPage__wrap}>
            {<RegisterForm />}
          </div>
          <h2 className={style.subheader}>
            You already have an account?
            <div>
              <Button value="Log in" className={styleBtn.secondaryButton} onClick={toggleFormType}/>
            </div>
          </h2>
        </>
      ) : (
        <>
          <h1 className={style.header}>Please, login to your account</h1>
          <div className={style.logInPage__wrap}>
            {<LoginForm />}
          </div>
          <h2 className={style.subheader}>
            New to WB?{" "}
            <div>
              <Button value="Create your WB account" className={styleBtn.secondaryButton} onClick={toggleFormType}/>
            </div>
          </h2>
        </>
      )}
    </div>
  );
};
export default Login;
