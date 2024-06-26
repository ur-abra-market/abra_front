import React from 'react';

import { Link } from 'react-router-dom';

// import imgBtnHeader from '../../assets/img/icons/check-mark.svg';
import { ReactComponent as Home } from '../../assets/img/icons/Home.svg';
// import { useAppSelector } from '../../store/hooks';
// import { ButtonLink } from '../buttons';

import style from './HeaderForChangePages.module.css';

// const navbarBtnClasses = {
//   wrapperButtonLink: `${style.wrapper_button_link}`,
//   wrapperBtnImg: `${style.wrapper_btn_img}`,
//   btnImg: `${style.button_img}`,
//   btnName: `${style.button_name}`,
// };

const HeaderForChangePages = (): JSX.Element => {
  // const isAuth = useAppSelector(state => state.logloginin.isAuth);

  return (
    <nav className={style.header_basic}>
      <Link className={style.header_basic_logo} to="/">
        Abra
      </Link>
      <Link to="/">
        <Home className={style.icon_home} />
      </Link>
      {/* {isAuth && ( */}
      {/*  <Link to="/personal-account"> */}
      {/*    <ButtonLink src={imgBtnHeader} classes={navbarBtnClasses} /> */}
      {/*  </Link> */}
      {/* )} */}
    </nav>
  );
};

export default HeaderForChangePages;
