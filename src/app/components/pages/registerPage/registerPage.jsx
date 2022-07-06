import React, { useState } from "react";
import RegisterForm from "../../ui/registerForm";
import Button from "../../common/buttons/button";
import style from "./registerPage.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";


const RegisterPage = ({togglePageType}) => {

    return (
        <>
            <h1 className={style.header}>Registration</h1>
            <div className={style.logInPage__wrap}>
                {<RegisterForm />}
            </div>
            <h2 className={style.subheader}>
                You already have an account?
                <div>
                    <Button value="Log in" className={styleBtn.secondaryButton} onClick={() => togglePageType()} />
                </div>
            </h2>
        </>
    )
}

export default RegisterPage;