import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import imgBtnHeader from '../../../assets/img/icons/icon-img.png';
import { useAppSelector } from '../../../store/hooks';
import { ButtonLink } from '../../buttons';
import { Button as AuthButton } from '../../ui-kit';
import { Search } from '../../ui-kit/Search/Search';

import style from './NavBar.module.css';

const navbarBtnClasses = {
  wrepperButtonLink: `${style.wrepperButtonLink}`,
  wrepperBtnImg: `${style.wrepperBtnImg}`,
  btnImg: `${style.btnImg}`,
  btnName: `${style.btnName}`,
};

const NavBar = (): JSX.Element => {
  const isAuth = useAppSelector(state => state.login.isAuth);
  const navigate = useNavigate();

  const handleAuthClick = (): void => {
    navigate('/auth');
  };

  return (
    <div className={style.header__basic}>
      <Link className={style.header__basic_logo} to="/">
        Abra
      </Link>

      <Search placeholder="Search" isPhotoSearch />

      {!isAuth ? (
        <div className={style.auth_buttons}>
          <AuthButton color="white" label="Log in" onClick={handleAuthClick} />
          <AuthButton color="black" label="Sign up" onClick={handleAuthClick} />
        </div>
      ) : (
        <div className={style.header__basic_buttons}>
          <Link className={style.wrepperButtonLink} to="/personal-account">
            <ButtonLink name="My Profile" src={imgBtnHeader} classes={navbarBtnClasses} />
          </Link>
          <Link className={style.wrepperButtonLink} to="/">
            <ButtonLink
              name="Notifications"
              src={imgBtnHeader}
              classes={navbarBtnClasses}
            />
          </Link>
          <Link className={style.wrepperButtonLink} to="/">
            <ButtonLink name="Favorites" src={imgBtnHeader} classes={navbarBtnClasses} />
          </Link>
          <Link className={style.wrepperButtonLink} to="/cart">
            <ButtonLink name="Cart" src={imgBtnHeader} classes={navbarBtnClasses} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
