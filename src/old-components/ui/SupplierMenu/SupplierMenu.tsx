import React from 'react';

import { NavLink } from 'react-router-dom';

import style from './SupplierMenu.module.scss';

import {
  ANALYTICS,
  DASHBOARD,
  FEEDBACK,
  ORDERS,
  PRICE,
  SUPPLIERS_PRODUCTS,
} from 'routes';

const SupplierMenu = (): JSX.Element => {
  const menu = [
    { name: 'Dashboard', path: DASHBOARD },
    { name: 'Products List', path: SUPPLIERS_PRODUCTS },
    { name: 'Orders', path: ORDERS },
    { name: 'Price Management', path: PRICE },
    { name: 'Analytics', path: ANALYTICS },
    { name: 'Feedback and questions', path: FEEDBACK },
  ];

  return (
    <ul className={style.wrapper}>
      {menu.map(item => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${style.menu_item_active}` : `${style.menu_item}`
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SupplierMenu;
