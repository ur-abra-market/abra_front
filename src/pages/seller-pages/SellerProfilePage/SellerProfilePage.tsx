import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import Orders from './Orders/Orders';
import { SellerAddresses } from './SellerAddresses/SellerAddresses';
import { SellerNotifications } from './SellerNotifications/SellerNotifications';
import { SellerPersonalInfoChangeForm } from './SellerPersonalInfoChangeForm/SellerPersonalInfoChangeForm';
import style from './SellerProfilePage.module.scss';

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

export const SellerProfilePage = WithLayout((): JSX.Element => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(sellerLoadingSelector);
  const { personalInfoLoading } = useAppSelector(userLoadingSelector);
  const { notificationsLoading, ...restLoading } = loading;

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
    <div className={style.seller_cabinet}>
      {isLoading && <LoaderLinear />}

      <div className={style.seller_cabinet_content_wrapper}>
        <div className={cn(style.section, style.personal_info)}>
          <SellerPersonalInfoChangeForm />
        </div>

        <div className={style.account_details}>
          <AccountManagement />
        </div>

        <div className={style.business_info}>
          <div className={style.section}>
            <Orders />
          </div>

          <div className={cn(style.section)}>
            <SellerAddresses />
          </div>
        </div>

        <div className={cn(style.section, style.notifications)}>
          <SellerNotifications />
        </div>
      </div>
    </div>
  );
});
