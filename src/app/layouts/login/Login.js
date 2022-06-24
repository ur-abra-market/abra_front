import React, { useEffect, useState } from "react";
import TextField from "../../components/commonComponents/textField";
import { validator } from "../../utils/validator";

const Login = () => {
  const [formType, setFormType] = useState("register");
  const [data, setData]=useState({email:"", password:""});
  const [errors, setErrors]=useState()
  const handleChange = ({target}) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validetorConfig = {
    email:{ isRequired: {message: "Email is required!"}},
    password:{ isRequired: {message: "Password is required!"}},
  }

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  useEffect(()=>{validate();},[data]);

  const validate = () => {
    const errors=validator(data, validetorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0
  };

  const handSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  }

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
          
          <form action="" onSubmit={handSubmit} >
            <TextField 
              label="Email" 
              name="email" 
              value={data.email} 
              onChange={handleChange}
              error={errors.email}
            />
            <TextField 
              label="Password" 
              type="password" 
              name="password" 
              value={data.password} 
              onChange={handleChange}
              error={errors.password}
            />
            <button>Submit</button>
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
