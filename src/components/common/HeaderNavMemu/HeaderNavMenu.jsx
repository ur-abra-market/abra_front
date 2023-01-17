import React from 'react';

import style from './HeaderNavMenu.module.css';

const HeaderNavMenu = () => {
  return (
    <nav className={style.header__nav}>
      <ul className={style.header__nav_list}>
        <li>
          <a href="news">Last News</a>
        </li>
        <li>
          <a href="tutorials">Tutorials for Buyers</a>
        </li>
        <li>
          <a href="sell">Sell on Abra</a>
        </li>
        <li>
          <a href="contact">Contact Support</a>
        </li>
        <li>
          <a href="faq">FAQ</a>
        </li>
        <li>
          <a href="about">About Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavMenu;
