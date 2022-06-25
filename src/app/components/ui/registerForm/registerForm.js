import React, { useEffect, useState } from "react";
import TextField from "../../commonComponents/textField"
import { validator } from "../../../utils/validator";

const RegisterForm = () => {
    const [data, setData]=useState({firstName:"", secondName:"",  phoneNumber:"", email:"", password:""});
    const [errors, setErrors]=useState({})

    const handleChange = ({target}) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
    };

    const validatorConfig = {
        firstName:{ isRequired: {message: "First name is required!"}},
        secondName:{ isRequired: {message: "Second name is required!"}},
        phoneNumber:{ isRequired: {message: "Phone number is required!"}},
        email:{ isRequired: {message: "Email is required!"}},
        password:{ isRequired: {message: "Password is required!"}},
    };
    useEffect(()=>{validate();},[data]);

    const validate = () => {
        const errors=validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0
    };

    const handSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form action="" onSubmit={handSubmit} >
            <TextField 
                label="First name" 
                name="firstName" 
                value={data.firstName} 
                onChange={handleChange}
                error={errors.firstName}
            />
            <TextField 
                label="Second name" 
                name="secondName" 
                value={data.secondName} 
                onChange={handleChange}
                error={errors.secondName}
            />
            <TextField 
                label="Email" 
                name="email" 
                value={data.email} 
                onChange={handleChange}
                error={errors.email}
            />
            <TextField 
                label="Phone number" 
                name="phoneNumber" 
                type="tel"
                value={data.phoneNumber} 
                onChange={handleChange}
                error={errors.phoneNumber}
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
    )
}
export default RegisterForm;