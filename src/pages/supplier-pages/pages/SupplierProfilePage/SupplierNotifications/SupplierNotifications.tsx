import React from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { NotificationsChangeForm } from 'modules';
import { ISupplierNotifications } from 'services/supplier/supplier.serviceTypes';
import {
  supplierLoadingSelector,
  supplierNotificationsSelector,
  updateSupplierNotifications,
} from 'store/reducers/supplier/profile';

export interface INotificationSupplierData {
  id: keyof ISupplierNotifications;
  label: string;
}

const NOTIFICATIONS_SUPPLIER_DATA: INotificationSupplierData[] = [
  { id: 'on_advertising_campaigns', label: 'Advertising campaigns' },
  { id: 'on_order_updates', label: 'Order updates' },
  { id: 'on_order_reminders', label: 'Order reminders' },
  { id: 'on_product_updates', label: 'Product updates' },
  { id: 'on_product_reminders', label: 'Product reminders' },
  { id: 'on_reviews_of_products', label: 'Reviews of products' },
  { id: 'on_change_in_demand', label: 'Change in demand' },
  { id: 'on_advice_from_abra', label: 'Advice from Abra' },
  { id: 'on_account_support', label: 'Account support' },
];

export const SupplierNotifications = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(supplierNotificationsSelector);
  const loading = useAppSelector(supplierLoadingSelector).notificationsLoading;
  const handleNotificationChange = (id: string, value: boolean): void => {
    dispatch(updateSupplierNotifications({ id, value }));
  };

  return (
    <NotificationsChangeForm
      notifications={notifications}
      callBack={handleNotificationChange}
      notificationsData={NOTIFICATIONS_SUPPLIER_DATA}
      disabled={loading}
    />
  );
};
