import { useEffect, useState } from 'react';

import { SupplierNotifications } from './SupplierNotifications/SupplierNotifications';
import style from './SupplierProfilePage.module.scss';

import { SupplierBusinessInfoChangeForm, SupplierPersonalInfoChangeForm } from '.';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { AccountManagement } from 'elements';
import { getCompanyNumberEmployees, getCountries } from 'store/reducers/commonSlice';
import {
  getBusinessInfo,
  getSupplierNotifications,
  supplierLoadingSelector,
} from 'store/reducers/supplier/profile';
import { getPersonalInfo } from 'store/reducers/userSlice';
import { LoaderLinear } from 'ui-kit';

export const SupplierProfilePage = (): JSX.Element => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(supplierLoadingSelector);
  const { notificationsLoading, ...restLoading } = loading;

  const isLoading = Object.values(restLoading).every(value => value !== 'loading');

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(getCountries());
      await dispatch(getPersonalInfo());
      await dispatch(getBusinessInfo());
      await dispatch(getCompanyNumberEmployees());
      await dispatch(getSupplierNotifications());

      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch]); // notifications не добавил так как дважды уйдут все запросы, сдесь это не надо

  if (isFetchingData) {
    return <LoaderLinear />;
  }

  return (
    <div className={style.supplier_cabinet}>
      {!isLoading && <LoaderLinear />}
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
};
