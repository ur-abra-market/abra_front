import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { ABOUT, CONTACT, FAQ, NEWS, SELL, TUTORIALS } from '../../routes';

import style from './HeaderNavMenu.module.css';
import { HeaderNavMenuProps } from './HeaderNavMenu.props';

const HeaderNavMenu: FC<HeaderNavMenuProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;
  const activeStyle = {
    color: ' var(--red)',
  };

  return (
    <nav {...restProps}>
      <ul className={cn(style.header_nav_list, className)}>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={NEWS}
          >
            Last News
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={TUTORIALS}
          >
            Tutorials for Buyers
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={SELL}
          >
            Sell on Abra
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={CONTACT}
          >
            Contact Support
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={FAQ}
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={ABOUT}
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavMenu;
