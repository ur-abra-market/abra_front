import React, { useEffect, useState } from "react";
import LoginForm from "../../components/ui/loginForm/loginForm";
import RegisterForm from "../../components/ui/registerForm/registerForm";

const Login = () => {
  const [formType, setFormType] = useState("login");

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div>
      {formType === "register" ? (
        <>
          <h3>Регистрация</h3>
          {<RegisterForm />}
          <p>
            У Вас есть аккаунт? <button onClick={toggleFormType}> Войти</button>
          </p>
        </>
      ) : (
        <>
          <h3>Вход</h3>

          {<LoginForm />}

          <p>
            У Вас нет аккаунта?{" "}
            <button onClick={toggleFormType}>Создать</button>
          </p>
        </>
      )}
    </div>
  );
};
export default Login;
