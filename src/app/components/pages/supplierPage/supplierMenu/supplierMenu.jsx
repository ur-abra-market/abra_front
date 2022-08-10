import React from 'react';
import style from './supplierMenu.module.css';
import PropTypes from "prop-types";

const SupplierMenu = ({onMenuItemSelect, selectedMenuItemID}) => {

    const menu = {
        'Profile': ['Business Profile', 'Dashboard'],
        'Products': ['Card Catalog', 'Manage Products', 'Analytics'],
        'Finance': ['Price Management', 'Orders'],
        'Сustomer feedback': ['Feedback and questions'],
    };

    return (
        <div className={style.supplierMenuSection_wrapper}>
            {Object.keys(menu).map(menuItem => 
                <>
                    <div key={menuItem.split(' ')[0]} className={style.menu_category}>{menuItem}</div>
                    <ul>
                        {menu[menuItem].map((submenu) => (
                            <li 
                                key={submenu.split(' ')[0]}
                                role='button'
                                onClick={() => onMenuItemSelect(submenu)}
                                className={submenu.split(' ')[0] === selectedMenuItemID ? `${style.menu_item__active}` : `${style.menu_item}`}
                            >
                                {submenu}
                                {console.log(menuItem.split(' ')[0])}
                            </li>
                        ))}
                    </ul>
                </>  
            )}
        </div>
    )
}

SupplierMenu.propTypes = {
    selectedMenuItemID: PropTypes.string,
    onMenuItemSelect: PropTypes.func
  };

export default SupplierMenu;