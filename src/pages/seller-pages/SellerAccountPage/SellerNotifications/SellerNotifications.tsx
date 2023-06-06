import React, { useEffect } from 'react';

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { NotificationsChangeForm } from '../../../../modules';
import { ISellerNotifications } from '../../../../services/seller/seller.serviceTypes';
import {
  getSupplierNotifications,
  updateSupplierNotifications,
} from '../../../../store/reducers/supplierAccountSlice';

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

export const SupplierNotifications = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.seller.notifications || null);

  const onNotificationChange = (id: string, value: boolean): void => {
    dispatch(updateSupplierNotifications({ id, value }));
  };

  useEffect(() => {
    if (notifications) {
      // return;
    }
    // dispatch(getSupplierNotifications());
  }, [dispatch]);

  return (
    <NotificationsChangeForm
      notifications={notifications as ISellerNotifications}
      callBack={onNotificationChange}
      notificationsData={NOTIFICATIONS_SELLER_DATA}
    />
    // <></>
  );
};
