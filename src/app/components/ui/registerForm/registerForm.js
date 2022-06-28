import React, { useEffect, useState } from "react";
import TextField from "../../commonComponents/textField/textField";
import RadioField from "../../commonComponents/radioField/radioField";
import { validator } from "../../../utils/validator";
import styleBtn from "../../commonComponents/buttons/buttons.module.css";


const RegisterForm = () => {
    const [data, setData]=useState({firstName:"", secondName:"",  phoneNumber:"", email:"", password:"", status:""});
    const [errors, setErrors]=useState({});

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
        email:{ 
            isRequired: {message: "Email is required!"},
            isEmail: {message: "Email is incorrect!"},
            isDigitSymbol: {message: "Password must contain a digit!"},
            min: {message: "Password must contain at least 8 characters!",
                value: 8},
        },
        password:{ isRequired: {message: "Password is required!"}},
    };
    useEffect(()=>{validate();},[data]);

    const validate = () => {
        const errors=validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0
    };

    const isValid = Object.keys(errors).length === 0;

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
            <RadioField
                options={[{name: "Seller", value: "seller"}, {name: "Supplier", value: "supplier"}]}
                value={data.status}
                name="status"
                onChange={handleChange} 
            />

            <button className={styleBtn.mainButton} disabled={!isValid}>Continue</button>
        </form>
    )
}
export default RegisterForm;