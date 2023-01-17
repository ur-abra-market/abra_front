import React from 'react';

import NavBar from '../../ui/NavBar';
import HeaderNavMenu from '../HeaderNavMemu';
import SelectCurrency from '../SelectCurrency';
import SelectShip from '../SelectShip';

import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <NavBar />
      <div className={style.header__menu}>
        <div className={style.header__menu_categories}>
          <div>All categories</div>
          <div className={style.dividing_line_1}>|</div>
        </div>
        <HeaderNavMenu />
        <div className={style.heder__selects}>
          <div className={style.dividing_line_2}>|</div>
          <SelectCurrency />
          <SelectShip />
        </div>
      </div>
    </header>
  );
};

export default Header;
