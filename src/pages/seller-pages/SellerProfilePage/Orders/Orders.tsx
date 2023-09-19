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
import { Title } from 'ui-kit/Title/Title';

export const Orders = (): JSX.Element => {
  return (
    <>
      <div className={style.header}>
        <Title as="h3" font="xs">
          Orders
        </Title>
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
          To be shipped
          <OrderStatusToBeShippedIcon />
        </Button>

        <Button color="white" className={style.orders_button}>
          Shipped
          <OrderStatusShippedIcon />
        </Button>

        <Button color="white" className={style.orders_button}>
          To be reviewed
          <OrderStatusToBeReviewedIcon className={style.icon} />
        </Button>

        <Button color="white" className={style.orders_button}>
          To be reviewed
          <OrderStatusCompletedIcon className={style.icon} />
        </Button>
      </div>
    </>
  );
};
