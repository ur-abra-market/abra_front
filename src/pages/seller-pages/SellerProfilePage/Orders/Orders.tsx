import { NavLink } from 'react-router-dom';

import {
  OrderStatusShippedIcon,
  OrderStatusToBeReviewedIcon,
  OrderStatusToBeShippedIcon,
  OrderStatusUnpaidIcon,
  OrderStatusCompletedIcon,
} from 'assets/icons';
import style from 'pages/seller-pages/SellerProfilePage/SellerProfilePage.module.css';
import { Button } from 'ui-kit';

const Orders = (): JSX.Element => {
  return (
    <>
      <div className={style.header_wrapper}>
        <div className={style.header}>Orders</div>
        <NavLink className={style.header_link} to="/order_history">
          View All
        </NavLink>
      </div>
      <div className={style.category_wrapper}>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>Unpaid</div>
          <OrderStatusUnpaidIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be shipped</div>
          <OrderStatusToBeShippedIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>Shipped</div>
          <OrderStatusShippedIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be reviewed</div>
          <OrderStatusToBeReviewedIcon />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be reviewed</div>
          <OrderStatusCompletedIcon className={style.completed_icon} />
        </Button>
      </div>
    </>
  );
};

export default Orders;
