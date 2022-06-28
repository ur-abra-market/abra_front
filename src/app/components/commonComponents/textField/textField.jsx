import React, {useState} from "react";
import PropTypes from "prop-types";
import style from "./textField.module.css"
import eyeClosed from '../../../img/icons/closed-eye.png';
import eyeOpend from '../../../img/icons/opend-eye.png';

const TextField = ({label, type, name, value, onChange, error}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword((prevState) => !prevState);
        let findPassword = document.getElementById('password');
        findPassword.type = (!showPassword) ? "text" : "password";
        console.log(findPassword.type);
        console.log(showPassword);
    }

    return (
        <div className={style.flexContainer}>
            <label htmlFor={name} className={style.labelTextField} > {label} </label>
            <div className={style.passwordWrapper}>
                <input 
                    type={showPassword ? "text" : type} 
                    id={name}
                    value={value} 
                    name={name} 
                    onChange={onChange}
                    className={(!(name==="password")) ? style.inputTextField : style.inputTextFieldPassword} 

                />
                {type === "password" && (
                    <div className={style.showPasswordBtn} onClick={toggleShowPassword}>
                        {(showPassword) ? 
                        <img src={eyeOpend}alt="eyeOpend" className={style.showPasswordBtn_img}></img> :
                        <img src={eyeClosed}alt="eyeClosed" className={style.showPasswordBtn_img}></img>}
                    </div>)
                }
            </div>
            {error && <div className={style.error}>{error}</div>}
        </div>
    );
};

TextField.defaultProps={
    type: "text"
};
TextField.propTypes={
    label: PropTypes.string,
    type: PropTypes.string, 
    name: PropTypes.string,
    value: PropTypes.string, 
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
