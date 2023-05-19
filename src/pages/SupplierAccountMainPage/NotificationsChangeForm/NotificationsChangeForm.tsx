import React from 'react';

import { updateSupplierNotifications } from '../../../store/reducers/supplierAccountSlice';

import style from './NotificationsChangeForm.module.css';

import { Checkbox } from 'components/ui-kit';
import { useAppDispatch, useAppSelector } from 'store/hooks';

// import { getSupplierNotifications } from '../../../store/reducers/supplierAccountSlice';

// TODO - с бэка приходят notifications seller'a

const NotificationsChangeForm = (): JSX.Element => {
  const notifications = useAppSelector(state => state.login.notifications);

  const dispatch = useAppDispatch();

  const keys = Object.keys(notifications ?? []);

  const NOTIFICATIONS_DATA: { id: string; value: boolean; label: string }[] = [
    {
      id: keys[1],
      value: notifications ? notifications.on_advertising_campaigns : false,
      label: 'Advertising campaigns',
    },
    {
      id: keys[2],
      value: notifications ? notifications.on_order_updates : false,
      label: 'Order updates',
    },
    {
      id: keys[3],
      value: notifications ? notifications.on_order_reminders : false,
      label: 'Order reminders',
    },
    {
      id: keys[4],
      value: notifications ? notifications.on_product_updates : false,
      label: 'Product updates',
    },
    {
      id: keys[5],
      value: notifications ? notifications.on_product_reminders : false,
      label: 'Product reminders',
    },
    {
      id: keys[6],
      value: notifications ? notifications.on_reviews_of_products : false,
      label: 'Reviews of products',
    },
    {
      id: keys[7],
      value: notifications ? notifications.on_change_in_demand : false,
      label: 'Change in demand',
    },
    {
      id: keys[8],
      value: notifications ? notifications.on_advice_from_abra : false,
      label: 'Advice from Abra',
    },
    {
      id: keys[9],
      value: notifications ? notifications.on_account_support : false,
      label: 'Account support',
    },
  ];

  const handleNotificationChange = (id: string, value: boolean): void => {
    dispatch(updateSupplierNotifications({ id, value }));
  };

  return (
    <div className={style.notifications}>
      <div className={style.title}>Notifications</div>
      <div className={style.notifications_list}>
        {NOTIFICATIONS_DATA.map((el, i) => {
          return (
            <Checkbox
              id={el.id}
              key={i}
              variant="notification"
              label={el.label}
              className={style.notifications_item}
              checked={el.value}
              onChange={event =>
                handleNotificationChange(
                  event.currentTarget.id,
                  event.currentTarget.checked,
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsChangeForm;
