import React, { useState } from "react";

const Login = () => {
  const [formType, setFormType] = useState("register");
  const [data, setData]=useState({email:"", password:""})
  const handleChange = ({target}) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
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
          
          <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={data.email} name="email" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" value={data.password} name="password" onChange={handleChange}/>
            </div>
          </form>
          
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
