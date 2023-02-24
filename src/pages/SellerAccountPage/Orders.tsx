import React from 'react';

import { Link } from 'react-router-dom';

import completed from 'assets/img/icons/completed.png';
import shipped from 'assets/img/icons/shipped.svg';
import toBeReviewed from 'assets/img/icons/to_be_reviewed.svg';
import toBeShipped from 'assets/img/icons/to_be_shipped.svg';
import unpaid from 'assets/img/icons/unpaid.svg';
import { ButtonLink } from 'components/buttons';
import { ordersCategoryBtnClasses } from 'pages/SellerAccountPage/classesStyles';
import style from 'pages/SellerAccountPage/SellerAccountPage.module.css';

const Orders = (): JSX.Element => {
  return (
    <>
      <div className={style.header_wrapper}>
        <div className={style.header}>Orders</div>
        <Link className={style.header_link} to="/order-history">
          View All
        </Link>
      </div>
      <div className={style.orders_category_wrapper}>
        <Link to="/order-history">
          <ButtonLink name="Unpaid" src={unpaid} classes={ordersCategoryBtnClasses} />
        </Link>
        <Link to="/order-history">
          <ButtonLink
            name="To be shipped"
            src={toBeShipped}
            classes={ordersCategoryBtnClasses}
          />
        </Link>
        <Link to="/order-history">
          <ButtonLink name="Shipped" src={shipped} classes={ordersCategoryBtnClasses} />
        </Link>
        <Link to="/order-history">
          <ButtonLink
            name="To be reviewed"
            src={toBeReviewed}
            classes={ordersCategoryBtnClasses}
          />
        </Link>
        <Link to="/order-history">
          <ButtonLink
            name="Completed"
            src={completed}
            classes={ordersCategoryBtnClasses}
          />
        </Link>
      </div>
    </>
  );
};

export default Orders;
