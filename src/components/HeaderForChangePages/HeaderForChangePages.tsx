import React from 'react';

import { Link } from 'react-router-dom';

import imgBtnHeader from '../../assets/img/icons/check-mark.svg';
import { useAppSelector } from '../../store/hooks';
import { ButtonLink } from '../buttons';

import style from './HeaderForChangePages.module.css';

const navbarBtnClasses = {
  wrepperButtonLink: `${style.wrepperButtonLink}`,
  wrepperBtnImg: `${style.wrepperBtnImg}`,
  btnImg: `${style.btnImg}`,
  btnName: `${style.btnName}`,
};

const HeaderForChangePages = (): JSX.Element => {
  const isAuth = useAppSelector(state => state.login.isAuth);

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
