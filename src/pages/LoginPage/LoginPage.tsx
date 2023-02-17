import React, { FC } from "react";

import { Link } from 'react-router-dom';

import style from './LoginPage.module.css';

import { Button } from 'components/buttons';
import styleBtn from 'components/buttons/Buttons.module.css';
import LoginForm from 'components/ui/LoginForm';

interface LoginPageProps {
  togglePageType: Function;
}
const LoginPage:FC<LoginPageProps> = ({ togglePageType }):JSX.Element => {
  return (
    <>
      <div className={style.authPage__wrap}>
        <Button value="Log in" className={`${styleBtn.activeButton} ${styleBtn.tab}`} />
        <Button
          value="Sign up"
          className={`${styleBtn.commonButton} ${styleBtn.tab}`}
          onClick={togglePageType}
        />
        <div className={style.form__wrap}>
          <LoginForm />
        </div>
      </div>
      <Link className={style.forgotPasswordlink} to="/forgotPassword">
        Forgot password?
      </Link>
    </>
  );
};


export default LoginPage;
