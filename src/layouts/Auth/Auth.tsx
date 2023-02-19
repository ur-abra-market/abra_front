import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import iconApple from '../../assets/img/icons/AppleIcon.svg';
import iconGoogle from '../../assets/img/icons/Goolge.svg';
import iconVK from '../../assets/img/icons/VK.png';
import styleBtn from '../../components/buttons/Buttons.module.css';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';

import style from './Auth.module.css';

const Auth = () => {
  const [pageType, setPageType] = useState('login');

  const togglePageType = () => {
    setPageType(prevState => (prevState === 'register' ? 'login' : 'register'));
  };

  return (
    <div className={style.authPage}>
      <h1 className={style.header}>
        <Link to="/" className={style.link}>Abra</Link>
      </h1>
      <h2 className={style.subheader}>Start buying in bulk now!</h2>
      {pageType === 'register' ? (
        <RegisterPage togglePageType={togglePageType} />
      ) : (
        <LoginPage togglePageType={togglePageType} />
      )}
      <div className={style.socialNetworksWrapper}>
        <div className={styleBtn.socialNetwork}>
          <a href="/src/routes" target="_blank">
            <img src={iconGoogle} alt="Google" />
          </a>
        </div>
        <div className={styleBtn.socialNetwork}>
          <a href="/src/routes" target="_blank">
            <img src={iconApple} alt="Apple" />
          </a>
        </div>
      </div>
      <div>
        <p className={style.footerText}>© 2023 Abra. Terms & conditions and Privacy policy</p>
      </div>
    </div>
  );
};

export default Auth;
