import React, { useState } from "react";
import LoginForm from "../../ui/loginForm/loginForm";
import Button from "../../common/buttons/button";
import style from "./loginPage.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";


const LoginPage = ({togglePageType}) => {

    return (
        <>
            <h1 className={style.header}>Please, login to your account</h1>
            <div className={style.logInPage__wrap}>
                {<LoginForm />}
            </div>
            <h2 className={style.subheader}>
                New to WB?{" "}
                <div>
                    <Button value="Create your WB account" className={styleBtn.secondaryButton} onClick={() => togglePageType()} />
                </div>
            </h2>
        </>
    )
}

export default LoginPage;