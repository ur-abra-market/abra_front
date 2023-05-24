import React from 'react';

import { Link } from 'react-router-dom';

import { MainLogo } from '../../../../ui-kit/MainLogo/MainLogo';

import style from './RegisterPage.module.scss';

import { RegisterForm } from './index';

export const RegisterPage = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <MainLogo />
      <div className={style.subtitle}>Start buying in bulk now!</div>

      <RegisterForm />

      <Link to="/auth">Log in</Link>
    </div>
  );
};
