import { useEffect, useState } from 'react';

import style from './SupplierProfilePage.module.scss';

import {
  SupplierBusinessInfoChangeForm,
  SupplierNotifications,
  SupplierPersonalInfoChangeForm,
} from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { AccountManagement } from 'elements';
import { getCountries } from 'store/reducers/commonSlice';
import {
  getBusinessInfo,
  getSupplierNotifications,
  supplierLoadingSelector,
} from 'store/reducers/supplier/profile';
import { getPersonalInfo, userLoadingSelector } from 'store/reducers/userSlice';
import { LoaderLinear } from 'ui-kit';

export const SupplierProfilePage = WithLayout((): JSX.Element => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(supplierLoadingSelector);
  const { personalInfoLoading } = useAppSelector(userLoadingSelector);
  const { notificationsLoading, ...restLoading } = loading;

  const isLoading =
    Object.values(restLoading).some(value => value === LoadingStatusEnum.Loading) ||
    personalInfoLoading === LoadingStatusEnum.Loading;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(getCountries());
      await dispatch(getPersonalInfo());
      await dispatch(getBusinessInfo());
      await dispatch(getSupplierNotifications());

      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch]);

  if (isFetchingData) {
    return <LoaderLinear />;
  }

  return (
    <div className={style.supplier_cabinet}>
      {isLoading && <LoaderLinear />}
      <div className={style.supplier_cabinet_content_wrapper}>
        <SupplierPersonalInfoChangeForm />

        <div className={style.business_profile}>
          <SupplierBusinessInfoChangeForm />
        </div>

        <div className={style.account_details}>
          <AccountManagement />
        </div>

        <div className={style.notifications}>
          <SupplierNotifications />
        </div>
      </div>
    </div>
  );
}, 'supplier');
