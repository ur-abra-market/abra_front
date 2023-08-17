import style from './Orders.module.scss';

import {
  OrderStatusCompletedIcon,
  OrderStatusShippedIcon,
  OrderStatusToBeReviewedIcon,
  OrderStatusToBeShippedIcon,
  OrderStatusUnpaidIcon,
} from 'assets/icons';
import { ORDER_HISTORY } from 'routes';
import { Button, SimpleLink } from 'ui-kit';

export const Orders = (): JSX.Element => {
  return (
    <>
      <div className={style.header}>
        <h3 className={style.title}>Orders</h3>
        <SimpleLink color="accent" to={ORDER_HISTORY}>
          View All
        </SimpleLink>
      </div>

      <div className={style.category_wrapper}>
        <Button color="white" className={style.orders_button}>
          <p className={style.button_title}>Unpaid</p>
          <OrderStatusUnpaidIcon />
        </Button>

        <Button color="white" className={style.orders_button}>
          <p className={style.button_title}>To be shipped</p>
          <OrderStatusToBeShippedIcon />
        </Button>

        <Button color="white" className={style.orders_button}>
          <p className={style.button_title}>Shipped</p>
          <OrderStatusShippedIcon />
        </Button>

        <Button color="white" className={style.orders_button}>
          <p className={style.button_title}>To be reviewed</p>
          <OrderStatusToBeReviewedIcon className={style.icon} />
        </Button>

        <Button color="white" className={style.orders_button}>
          <p className={style.button_title}>To be reviewed</p>
          <OrderStatusCompletedIcon className={style.icon} />
        </Button>
      </div>
    </>
  );
};
