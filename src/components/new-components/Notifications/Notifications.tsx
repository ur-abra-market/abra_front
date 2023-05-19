import React, { FC } from 'react';

import { updateSupplierNotifications } from '../../../store/reducers/supplierAccountSlice';

import style from './Notifications.module.css';

import { Checkbox } from 'components/ui-kit';
import { useAppDispatch } from 'store/hooks';

interface INotificationsProps {
  notificationsData: INotificationsItem[];
}

export interface INotificationsItem {
  id: string;
  value: boolean;
  label: string;
}

const Notifications: FC<INotificationsProps> = props => {
  const { notificationsData } = props;

  const dispatch = useAppDispatch();

  const handleNotificationChange = (id: string, value: boolean): void => {
    dispatch(updateSupplierNotifications({ id, value }));
  };

  return (
    <div className={style.notifications}>
      <div className={style.title}>Notifications</div>
      <div className={style.notifications_list}>
        {notificationsData.map((el, i) => {
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

export default Notifications;
