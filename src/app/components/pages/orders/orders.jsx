import React from 'react';
import { ButtonLink } from '../../common/buttons';
import NavBarUniversal from '../../common/navBarUniversal/navBarUniversal';
import iconImage from "../../../assets/img/icons/icon-img.png";
import logOut from "../../../assets/img/icons/ligIn-logOut.svg";
import style from '../orders/orders.module.css';
import { Link } from 'react-router-dom';

const Orders = (params) => {
    const ordersCategoryBtnClasses = {
        wrepperBtnImg: `${style.wrepperBtnImg}`,
        btnImg: `${style.btnImg}`,
        btnName: `${style.btnName}`,
      };
    return (
        <NavBarUniversal
            logo={
                <>
                    <Link to="/">Abra</Link>
                    <span className={style.verticalLine}></span>
                    <span>SUPPLIER</span>
                </>
            }
            links={[
                <>
                    <Link className={style.wrepperButtonLink} to="/">
                        <ButtonLink
                        name="Notifications"
                        src={iconImage}
                        classes={ordersCategoryBtnClasses}
                        />
                    </Link>
                    <Link className={style.wrepperButtonLink} to="/">
                        <ButtonLink
                        name="Log Out"
                        src={logOut}
                        classes={ordersCategoryBtnClasses}
                        />
                    </Link>
                </>
            ]}
        />
    );
}
 
export default Orders;