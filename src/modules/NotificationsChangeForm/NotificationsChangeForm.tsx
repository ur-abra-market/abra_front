import React, { FC } from 'react';

import { LoadingStatus } from '../../common/types';
import { INotificationSellerData } from '../../pages/seller-pages/SellerProfilePage/SellerNotifications/SellerNotifications';
import { INotificationSupplierData } from '../../pages/supplier-pages/pages/SupplierProfilePage/SupplierNotifications/SupplierNotifications';
import { ISellerNotifications } from '../../services/seller/seller.serviceTypes';
import { ISupplierNotifications } from '../../services/supplier/supplier.serviceTypes';

import style from './NotificationsChangeForm.module.scss';

import { Checkbox } from 'ui-kit';

interface INotificationsChangeForm {
  callBack: (id: string, value: boolean) => void;
  notifications: Partial<ISellerNotifications & ISupplierNotifications> | null;
  notificationsData: INotificationSupplierData[] | INotificationSellerData[];
  disabled?: LoadingStatus;
}

export const NotificationsChangeForm: FC<INotificationsChangeForm> = ({
  notifications,
  callBack,
  notificationsData,
  disabled,
}): JSX.Element => {
  const onNotificationChange = (id: string, value: boolean): void => {
    callBack(id, value);
  };

  return (
    <div className={style.notifications}>
      <div className={style.title}>Notifications</div>
      <div className={style.notifications_list}>
        {notificationsData.map(el => {
          return (
            <Checkbox
              id={el.id}
              key={el.id}
              disabled={disabled === LoadingStatus.Loading}
              variant="notification"
              label={el.label}
              className={style.notifications_item}
              checked={notifications ? notifications[el.id] : false}
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
