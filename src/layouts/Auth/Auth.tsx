import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import iconApple from '../../assets/img/icons/Apple.png';
import iconGoogle from '../../assets/img/icons/Google.png';
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
        <Link to="/">Abra</Link>
      </h1>
      <h2 className={style.subheader}>Start buying in bulk now!</h2>
      {pageType === 'register' ? (
        <RegisterPage togglePageType={togglePageType} />
      ) : (
        <LoginPage togglePageType={togglePageType} />
      )}
      <div className={style.socialNetworksWrapper}>
        <div className={`${styleBtn.commonButton} ${styleBtn.socialNetwork}`}>
          <a href="/src/routes" target="_blank">
            <img src={iconGoogle} alt="Google" />
          </a>
        </div>
        <div className={`${styleBtn.commonButton} ${styleBtn.socialNetwork}`}>
          <a href="/src/routes" target="_blank">
            <img src={iconApple} alt="Apple" />
          </a>
        </div>
        <div className={`${styleBtn.commonButton} ${styleBtn.socialNetwork}`}>
          <a href="/src/routes" target="_blank">
            <img src={iconVK} alt="VK" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
