import React, { useState } from 'react';

import { Link, Navigate } from 'react-router-dom';

import { Container } from '../../components';
import LoginForm from '../../components/new-components/LoginForm';
import RegisterForm from '../../components/new-components/RegisterForm';
import { Button } from '../../components/ui-kit';
import { useAppSelector } from '../../store/hooks';

import style from './AuthPage.module.css';

const AuthPage = (): JSX.Element => {
  const [pageType, setPageType] = useState<'login' | 'register'>('login');
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
      <footer className={style.footer}>
        <Container className={style.links}>
          © Copyright 2022.
          <Link to="/"> Terms & Conditions </Link>
          and
          <Link to="/"> Privacy Policy</Link>
        </Container>
      </footer>
    </div>
  );
};

export default AuthPage;
