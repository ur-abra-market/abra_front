import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import photo from '../../../assets/img/icons/ic_baseline-photo-camera.png';
import imgBtnHeader from '../../../assets/img/icons/icon-img.png';
import { useAppSelector } from '../../../store/hooks';
import { ButtonLink, Button } from '../../buttons';
import styleBtn from '../../buttons/Buttons.module.css';
import Search from '../../Search';

import style from './NavBar.module.css';

const navbarBtnClasses = {
  wrepperButtonLink: `${style.wrepperButtonLink}`,
  wrepperBtnImg: `${style.wrepperBtnImg}`,
  btnImg: `${style.btnImg}`,
  btnName: `${style.btnName}`,
};

const searchClasses = {
  search__wrap: `${style.search__wrap}`,
  search__input: `${style.search__input}`,
};

const NavBar = (): JSX.Element => {
  const isAuth = useAppSelector(state => state.login.isAuth);

  return (
    <nav className={style.header__basic}>
      <Link className={style.header__basic_logo} to="/">
        Abra
      </Link>
      <Search placeholder="Search" searchIcon={photo} classes={searchClasses} />

      <div className={style.header__basic_buttons}>
        {!isAuth ? (
          <>
            <Link className={style.wrepperButtonLink} to="/auth">
              <Button
                value="Log in"
                className={`${styleBtn.commonButton} ${styleBtn.tab}`}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/auth">
              <Button
                value="Sign up"
                className={`${styleBtn.commonButton} ${styleBtn.tab}`}
              />
            </Link>
          </>
        ) : (
          <>
            <Link className={style.wrepperButtonLink} to="/personal-account">
              <ButtonLink
                name="My Profile"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
            {/* supplierPage тут временно */}
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Notifications"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Favorites"
                src={imgBtnHeader}
                classes={navbarBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/cart">
              <ButtonLink name="Cart" src={imgBtnHeader} classes={navbarBtnClasses} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
