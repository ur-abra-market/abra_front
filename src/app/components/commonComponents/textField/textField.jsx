import React from "react";
import PropTypes from "prop-types";
import style from "./textField.module.css"

const TextField = ({label, type, name, value, onChange, error}) => {
    return (
        <div>
            <label htmlFor={name} className={style.labelTextField} > {label} </label>
            <div/>
            <input 
                type={type} 
                id={name}
                value={value} 
                name={name} 
                onChange={onChange}
                className={style.inputTextField} 
            />
            {error && <p>{error}</p>}
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
