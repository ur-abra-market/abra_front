import React  from "react";
import LoginForm from "../../ui/loginForm/loginForm";
import { Link } from "react-router-dom";
import Button from "../../common/buttons/button";
import style from "./loginPage.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";
import PropTypes from "prop-types";


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
            <Link className={style.forgotPasswordlink} to="/forgotPasswordPage">
            Forgot password?
            </Link>
        </>
    )
}

export default LoginPage;

LoginPage.propTypes={
    togglePageType: PropTypes.func,
}