import React, { useState } from 'react';

import { Link, Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../common/hooks/useAppSelector';
import LoginForm from '../../../components/LoginForm';
import RegisterForm from '../../../components/RegisterForm';
import { FooterForAuth } from '../../../old-components/FooterForAuth/FooterForAuth';
import { Button } from '../../../ui-kit';

import style from './AuthPage.module.css';

const AuthPage = (): JSX.Element => {
  const location = useLocation();
  const locationData = location.state;

  const authorizationMethod = locationData === 'Log In' ? 'login' : 'register';

  const [pageType, setPageType] = useState<'login' | 'register'>(authorizationMethod);
  const { isAuth } = useAppSelector(state => state.login);

  const selectPage = (pageType: 'login' | 'register'): void => {
    setPageType(pageType);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.wrapper}>
      <main className={style.main}>
        <h1 className={style.title}>
          <Link to="/">Abra</Link>
        </h1>
        <div className={style.subtitle}>Start buying in bulk now!</div>

        <div className={style.buttons}>
          <Button
            color={pageType === 'login' ? 'black' : 'white'}
            onClick={() => selectPage('login')}
            label="Log in"
          />
          <Button
            color={pageType === 'register' ? 'black' : 'white'}
            onClick={() => selectPage('register')}
            label="Sign up"
          />
        </div>
        {pageType === 'register' ? <RegisterForm /> : <LoginForm />}
      </main>
      <FooterForAuth />
    </div>
  );
};

export default AuthPage;
