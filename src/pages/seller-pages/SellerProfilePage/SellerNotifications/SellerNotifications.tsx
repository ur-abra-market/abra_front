import React from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { NotificationsChangeForm } from 'modules';
import { ISellerNotifications } from 'services/seller/seller.serviceTypes';
import {
  updateSellerNotifications,
  sellerLoadingSelector,
  sellerNotificationSelector,
} from 'store/reducers/seller/profile';

export interface INotificationSellerData {
  id: keyof ISellerNotifications;
  label: string;
}

const NOTIFICATIONS_SELLER_DATA: INotificationSellerData[] = [
  { id: 'on_discount', label: 'Discounts & offers' },
  { id: 'on_order_updates', label: 'Order updates' },
  { id: 'on_order_reminders', label: 'Order reminders' },
  { id: 'on_stock_again', label: 'On stock again' },
  { id: 'on_product_is_cheaper', label: 'Product is cheaper' },
  { id: 'on_your_favorites_new', label: 'Your favorites new' },
  { id: 'on_account_support', label: 'Account support' },
];

export const SellerNotifications = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(sellerNotificationSelector);
  const loading = useAppSelector(sellerLoadingSelector).notificationsLoading;

  const onNotificationChange = (id: string, value: boolean): void => {
    dispatch(updateSellerNotifications({ id, value }));
  };

  return (
    <NotificationsChangeForm
      notifications={notifications}
      callBack={onNotificationChange}
      notificationsData={NOTIFICATIONS_SELLER_DATA}
      disabled={loading}
    />
  );
};
