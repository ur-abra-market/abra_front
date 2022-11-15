import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './SupplierMenu.module.css'

const SupplierMenu = () => {
  const menu = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'Products List', path: 'products-list' },
    { name: 'Orders', path: 'orders' },
    { name: 'Price Management', path: 'price' },
    { name: 'Analytics', path: 'analytics' },
    { name: 'Feedback and questions', path: 'feedback' }
  ]

  return (
    <ul className={style.supplierMenuSection_wrapper}>
      {menu.map((item) => (
        <li key={item.path} role="button">
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
  )
}

export default SupplierMenu
