import React, { useState } from "react";

import { useParams } from "react-router-dom";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
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

          <p>
            У Вас есть аккаунт? <button onClick={toggleFormType}> Войти</button>
          </p>
        </>
      ) : (
        <>
          <h3>Вход</h3>

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
