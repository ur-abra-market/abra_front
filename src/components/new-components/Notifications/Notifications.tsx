import React, { FC } from 'react';

import { updateSellerNotificationsService } from '../../../store/reducers/sellerSlice';
import { updateSupplierNotificationsService } from '../../../store/reducers/supplierAccountSlice';

import style from './Notifications.module.css';

import { Checkbox } from 'components/ui-kit';
import { useAppDispatch, useAppSelector } from 'store/hooks';

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

  const userRole = useAppSelector(state => state.login.userRole);
  const dispatch = useAppDispatch();

  const handleNotificationChange = (id: string, value: boolean): void => {
    if (userRole === 'seller') {
      dispatch(updateSellerNotificationsService({ id, value }));
    } else {
      dispatch(updateSupplierNotificationsService({ id, value }));
    }
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
