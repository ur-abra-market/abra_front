import React from 'react';
import style from './supplierMenu.module.css';
import PropTypes from "prop-types";

const SupplierMenu = ({onMenuItemSelect, selectedMenuItemID}) => {

    // const menu = {
    //     'Profile': ['Business Profile', 'Dashboard'],
    //     'Products': ['Card Catalog', 'Manage Products', 'Analytics'],
    //     'Finance': ['Price Management', 'Orders'],
    //     'Сustomer feedback': ['Feedback and questions'],
    // };
    const menu = [
        'Dashboard',
        'Products List',
        'Orders',
        'Price Management',
        'Analytics',
        'Feedback and questions'
    ]

    return (
        <ul className={style.supplierMenuSection_wrapper}>
            {menu.map((item) => (
                <li 
                    key={item.split(' ')[0]}
                    role='button'
                    onClick={() => onMenuItemSelect(item)}
                    className={item.split(' ')[0] === selectedMenuItemID ? `${style.menu_item__active}` : `${style.menu_item}`}
                >
                    {item}
                </li>
            ))}
        </ul>

    )
}

SupplierMenu.propTypes = {
    selectedMenuItemID: PropTypes.string,
    onMenuItemSelect: PropTypes.func
  };

export default SupplierMenu;