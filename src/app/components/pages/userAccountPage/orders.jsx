import React from "react";
import style from "./userAccountPage.module.css";
import { Link } from "react-router-dom";
import { ButtonLink } from "../../common/buttons";
import iconImage from "../../../assets/img/icons/icon-img.png";
import { ordersCategoryBtnClasses } from "./classesStyles";


const Orders = () => {
    return (
        <>
        <div className={style.header__wrapper}>
            <div className={style.header}>Orders</div>
            <Link className={style.header__link} to="/">
              View All
            </Link>
          </div>
          <div className={style.ordersCategory__wrapper}>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Unpaid"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="To be shipped"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Shipped"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="To be reviewed"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
            <Link className={style.wrepperButtonLink} to="/">
              <ButtonLink
                name="Completed"
                src={iconImage}
                classes={ordersCategoryBtnClasses}
              />
            </Link>
          </div>
        </>

    )
}

export default Orders;