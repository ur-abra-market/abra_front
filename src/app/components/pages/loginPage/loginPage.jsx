import React  from "react";
import LoginForm from "../../ui/loginForm/loginForm";
import Button from "../../common/buttons/button";
import style from "./loginPage.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";


const LoginPage = ({togglePageType}) => {

    return (
        <>
            <div className={style.authPage__wrap}>
                <Button value="Log in" className={`${styleBtn.activeButton} ${styleBtn.tab}`}/>
                <Button value="Sign up" className={`${styleBtn.commonButton} ${styleBtn.tab}`} onClick={togglePageType}/>
                <div className={style.form__wrap}>
                    {<LoginForm />}
                </div>
            </div>
            <a href="/" className={style.forgotPasswordlink}>Forgot password?</a>
        </>
    )
}

export default LoginPage;