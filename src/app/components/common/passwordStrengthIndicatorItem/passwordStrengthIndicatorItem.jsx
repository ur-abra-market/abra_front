import React from "react";
import style from "./passwordStrengthIndicatorItem.module.css";

const PasswordStrengthIndicatorItem = ({isValid, text}) => {
    return ( 
    <>
        <div className={style.requirement}>
            <div className={isValid 
            ? style.requirementMet 
            : style.requirementNotMet}></div>
            <div>{text}</div>
        </div>
    </>
)}

export default PasswordStrengthIndicatorItem;