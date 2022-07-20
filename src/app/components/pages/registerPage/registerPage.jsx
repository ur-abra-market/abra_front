import React from "react";
import RegisterForm from "../../ui/registerForm";
import Button from "../../common/buttons/button";
import style from "./registerPage.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";
import PropTypes from "prop-types";


const RegisterPage = ({togglePageType}) => {

    return (
        <>
            <div className={style.authPage__wrap}>
                <Button value="Log in" className={`${styleBtn.commonButton } ${styleBtn.tab}`} onClick={togglePageType}/>
                <Button value="Sign up" className={`${styleBtn.activeButton } ${styleBtn.tab}`}/>
                <div className={style.form__wrap}>
                    {<RegisterForm />}
                </div>
            </div>
        </>
    )
}

RegisterPage.propTypes={
    togglePageType: PropTypes.func,
}


export default RegisterPage;