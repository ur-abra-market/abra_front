import React from 'react';

import HeaderNavMenu from '../HeaderNavMemu';
import SelectCurrency from '../SelectCurrency';
import SelectShip from '../SelectShip';
import NavBar from '../ui/NavBar';

import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <NavBar />
      <div className="header__menu">
        <div className="header__menu_categories">
          <div className="header_all-categories">All categories</div>
          <div className="dividing-line-1">|</div>
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
