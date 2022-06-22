import React, { useState } from "react";
import TextField from "../../components/commonComponents/textField";

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
            <TextField 
              label="Email" 
              name="email" 
              value={data.email} 
              onChange={handleChange}
            />
            <TextField 
              label="Password" 
              type="password" 
              name="password" 
              value={data.password} 
              onChange={handleChange}
            />
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
