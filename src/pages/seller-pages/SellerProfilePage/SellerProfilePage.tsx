import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import { Orders } from './Orders/Orders';
import { SellerPersonalInfoChangeForm } from './SellerPersonalInfoChangeForm/SellerPersonalInfoChangeForm';

import { SellerAddresses, SellerNotifications } from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { AccountManagement } from 'elements';
import { getCountries } from 'store/reducers/commonSlice';
import {
  getSellerAvatar,
  getSellerAddresses,
  getSellerNotifications,
  sellerLoadingSelector,
} from 'store/reducers/seller/profile';
import { getPersonalInfo, userLoadingSelector } from 'store/reducers/userSlice';
import { LoaderLinear } from 'ui-kit';

import style from './SellerProfilePage.module.scss';

export const SellerProfilePage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(sellerLoadingSelector);
  const { personalInfoLoading } = useAppSelector(userLoadingSelector);
  const { notificationsLoading, ...restLoading } = loading;
  const [isFetchingData, setIsFetchingData] = useState(true);

  const isLoading =
    Object.values(restLoading).some(value => value === LoadingStatusEnum.Loading) ||
    personalInfoLoading === LoadingStatusEnum.Loading;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(getCountries());
      await dispatch(getPersonalInfo());
      await dispatch(getSellerAvatar());
      await dispatch(getSellerAddresses());
      await dispatch(getSellerNotifications());

      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch]);

  if (isFetchingData) {
    return <LoaderLinear />;
  }

  return (
    <div className={style.wrapper}>
      {isLoading && <LoaderLinear />}

      <div className={style.content_container}>
        <div className={cn(style.section, style.personal_info)}>
          <SellerPersonalInfoChangeForm />
        </div>

        <div className={style.account_management}>
          <AccountManagement />
        </div>

        <div className={cn(style.section, style.orders)}>
          <Orders />
        </div>

        <div className={cn(style.section, style.seller_addresses)}>
          <SellerAddresses />
        </div>

        <div className={cn(style.section, style.notifications)}>
          <SellerNotifications />
        </div>
      </div>
    </div>
  );
});
