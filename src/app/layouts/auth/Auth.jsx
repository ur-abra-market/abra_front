import React, { useState } from "react";
import style from "./auth.module.css";
import LoginPage from "../../components/pages/loginPage/loginPage";
import RegisterPage from "../../components/pages/registerPage/registerPage";


const Auth = () => {
    const [pageType, setPageType] = useState("login");

    const togglePageType = () => {
        setPageType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className={style.logInPage}> {
            pageType === "register" ? (
                <RegisterPage togglePageType={togglePageType} />
            ) : (
                <LoginPage togglePageType={togglePageType} />
            )
        }
        </div>
    );
};
export default Auth;