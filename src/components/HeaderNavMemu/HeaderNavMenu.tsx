import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './HeaderNavMenu.module.css';
import { HeaderNavMenuProps } from './HeaderNavMenu.props';

const HeaderNavMenu: FC<HeaderNavMenuProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <nav className={cn(style.header_nav, className)} {...restProps}>
      <ul className={style.header_nav_list}>
        <li>
          <Link to="/news">Last News</Link>
        </li>
        <li>
          <Link to="/tutorials">Tutorials for Buyers</Link>
        </li>
        <li>
          <Link to="/sell">Sell on Abra</Link>
        </li>
        <li>
          <Link to="/contact">Contact Support</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavMenu;
