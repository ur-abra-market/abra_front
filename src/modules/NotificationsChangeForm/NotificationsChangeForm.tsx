import React, { FC } from 'react';

import style from './NotificationsChangeForm.module.scss';

import { LoadingStatusEnum } from 'common/types';
import { INotificationSellerData } from 'pages/seller-pages/SellerProfilePage/SellerNotifications/SellerNotifications';
import { INotificationSupplierData } from 'pages/supplier-pages/pages/SupplierProfilePage/SupplierNotifications/SupplierNotifications';
import { ISellerNotifications } from 'services/seller/seller.serviceTypes';
import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';
import { Checkbox } from 'ui-kit';
import { Title } from 'ui-kit/Title/Title';

interface INotificationsChangeForm {
  callBack: (id: string, value: boolean) => void;
  notifications: Partial<ISellerNotifications & ISupplierNotifications> | null;
  notificationsData: INotificationSupplierData[] | INotificationSellerData[];
  disabled?: LoadingStatusEnum;
}

export const NotificationsChangeForm: FC<INotificationsChangeForm> = ({
  notifications,
  callBack,
  notificationsData,
  disabled,
}): JSX.Element => {
  const handleChangeNotification = (id: string, value: boolean): void => {
    callBack(id, value);
  };

  return (
    <>
      <Title as="h3" font="xs">
        Notifications
      </Title>
      <div className={style.notifications_list}>
        {notificationsData.map(el => {
          return (
            <Checkbox
              id={el.id}
              key={el.id}
              disabled={disabled === LoadingStatusEnum.Loading}
              variant="notification"
              label={el.label}
              className={style.notifications_item}
              checked={notifications ? notifications[el.id] : false}
              onChange={event =>
                handleChangeNotification(
                  event.currentTarget.id,
                  event.currentTarget.checked,
                )
              }
            />
          );
        })}
      </div>
    </>
  );
};
