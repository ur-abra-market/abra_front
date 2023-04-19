import React, { FC } from 'react';

import { INotification } from '../../../services/supplierAccount.service';

import style from './NotificationsChangeForm.module.css';

import { Checkbox } from 'components/ui-kit';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { updateSupplierNotifications } from 'store/reducers/supplierAccountSlice';

// import { getSupplierNotifications } from '../../../store/reducers/supplierAccountSlice';

// TODO - с бэка приходят notifications seller'a
const NOTIFICATIONS_DATA: { id: keyof INotification; label: string }[] = [
  { id: 'on_discount', label: 'Discounts & offers' },
  { id: 'on_order_updates', label: 'Order updates' },
  { id: 'on_order_reminders', label: 'Order reminders' },
  { id: 'on_stock_again', label: 'On stock again' },
  { id: 'on_product_is_cheaper', label: 'Product is cheaper' },
  { id: 'on_your_favorites_new', label: 'Your favorites new' },
  { id: 'on_account_support', label: 'Account support' },
];

const NotificationsChangeForm: FC = (): JSX.Element => {
  const notifications =
    useAppSelector(state => state.supplierAccount.notifications) || null;
  const dispatch = useAppDispatch();

  const onNotificationChange = (id: string, value: boolean): void => {
    dispatch(updateSupplierNotifications({ id, value }));
  };

  return (
    <div className={style.notifications}>
      <div className={style.title}>Notifications</div>
      <div className={style.notifications_list}>
        {NOTIFICATIONS_DATA.map(el => {
          return (
            <Checkbox
              id={el.id}
              key={el.id}
              variant="notification"
              label={el.label}
              className={style.notifications_item}
              checked={notifications ? notifications[`${el.id}`] : false}
              onChange={event =>
                onNotificationChange(event.currentTarget.id, event.currentTarget.checked)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsChangeForm;
