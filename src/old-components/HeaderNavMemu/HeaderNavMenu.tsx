import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './HeaderNavMenu.module.scss';
import { HeaderNavMenuProps } from './HeaderNavMenu.props';

export const HeaderNavMenu: FC<HeaderNavMenuProps> = (props): JSX.Element => {
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
            to="/news"
          >
            Last News
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/tutorials"
          >
            Tutorials for Buyers
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/sell"
          >
            Sell on Abra
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/contact"
          >
            Contact Support
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/faq"
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/about"
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
