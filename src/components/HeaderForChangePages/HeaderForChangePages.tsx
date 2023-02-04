import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import imgBtnHeader from '../../assets/img/icons/check-mark.svg';
import { ButtonLink } from '../buttons';

import style from './HeaderForChangePages.module.css';

const navbarBtnClasses = {
  wrepperButtonLink: `${style.wrepperButtonLink}`,
  wrepperBtnImg: `${style.wrepperBtnImg}`,
  btnImg: `${style.btnImg}`,
  btnName: `${style.btnName}`,
};

const HeaderForChangePages = () => {
  const isAuth = useSelector(state => state.login.isAuth);

  return (
    <nav className={style.header__basic}>
      <Link className={style.header__basic_logo} to="/">
        Abra
      </Link>

      {isAuth && (
        <Link to="/personal-account">
          <ButtonLink src={imgBtnHeader} classes={navbarBtnClasses} />
        </Link>
      )}
    </nav>
  );
};

export default HeaderForChangePages;
