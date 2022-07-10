import React, {useState} from "react";
import PropTypes from "prop-types";
import style from "./textField.module.css"
import eyeHiddenPassword from '../../../assets/img/icons/eye_hidden_password.png';
import eyeVisiblePassword from '../../../assets/img/icons/eye_visible_password.png';

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
        <>
            <label htmlFor={name} className={style.labelTextField} > {label} </label>
            <div className={style.innerWrapper}>
                <input 
                    type={showPassword ? "text" : type} 
                    id={name}
                    value={value} 
                    name={name} 
                    onChange={onChange}
                    className={(!(name==="password")) ? style.inputTextField : style.inputTextFieldPassword}
                    placeholder={label} 

                />
                {type === "password" && (
                    <div className={style.showPasswordBtn} onClick={toggleShowPassword}>
                        {(showPassword) ? 
                        <img src={eyeVisiblePassword}alt="eyeVisiblePassword" className={style.showPasswordBtn_img}></img> :
                        <img src={eyeHiddenPassword}alt="eyeHiddenPassword" className={style.showPasswordBtn_img}></img>}
                    </div>)
                }
            </div>
            {error && <div className={style.error}>{error}</div>}
        </>
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