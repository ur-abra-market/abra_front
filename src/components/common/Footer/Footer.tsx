import React from 'react';

import { useLocation } from 'react-router-dom';

import HeaderNavMenu from '../HeaderNavMemu/HeaderNavMenu';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import SelectShip from '../SelectShip/SelectShip';

import style from './Footer.module.css';

const Footer = () => {
  const routs = ['personal-account', 'order-history'];
  const { pathname } = useLocation();
  const showHeadNav = routs.some(el => el === pathname.split('/')[1]);

  return (
    <div className={style.footer}>
      {showHeadNav ? (
        <></>
      ) : (
        <div className={style.footer__basic}>
          <div className={style.footer__basic_logo}>Abra</div>
          <HeaderNavMenu />
          <div className={style.footer__selects}>
            <div className={style.dividing_line_2}>|</div>
            <SelectCurrency />
            <SelectShip />
          </div>
        </div>
      )}

      <div className={style.footer__add}>
        <div className={style.footer__add_text1}>© Copyright 2022</div>
        <div className={style.footer__add_text2}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
        <div className={style.footer__add_text1} />
      </div>
    </div>
  );
};

export default Footer;
