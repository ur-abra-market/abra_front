import { Link } from 'react-router-dom';

import style from './Orders.module.scss';

import {
  OrderStatusShippedIcon,
  OrderStatusToBeReviewedIcon,
  OrderStatusToBeShippedIcon,
  OrderStatusUnpaidIcon,
  OrderStatusCompletedIcon,
} from 'assets/icons';
import { ORDER_HISTORY } from 'routes';
import { Button } from 'ui-kit';

const Orders = (): JSX.Element => {
  return (
    <>
      <div className={style.header}>
        <h3 className={style.title}>Orders</h3>
        <Link className={style.header_link} to={ORDER_HISTORY}>
          View All
        </Link>
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
          <OrderStatusToBeReviewedIcon className={style.icon} />
        </Button>
        <Button color="white" className={style.orders_button}>
          <div className={style.button_title}>To be reviewed</div>
          <OrderStatusCompletedIcon className={style.icon} />
        </Button>
      </div>
    </>
  );
};

export default Orders;
