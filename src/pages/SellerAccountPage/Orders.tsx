import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../../components/ui-kit';

import { ReactComponent as ShippedIcon } from 'assets/img/icons/shipped.svg';
import { ReactComponent as ToBeReviewedIcon } from 'assets/img/icons/to_be_reviewed.svg';
import { ReactComponent as ToBeShippedIcon } from 'assets/img/icons/to_be_shipped.svg';
import { ReactComponent as UnPaidIcon } from 'assets/img/icons/unpaid.svg';
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
      <div className={style.category_wrapper}>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>Unpaid</div>
          <UnPaidIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be shipped</div>
          <ToBeShippedIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>Shipped</div>
          <ShippedIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be reviewed</div>
          <ToBeReviewedIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be reviewed</div>
          <div className={style.completed_icon} />
        </Button>
      </div>
    </>
  );
};

export default Orders;
