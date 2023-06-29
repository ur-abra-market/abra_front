import { useEffect, useState } from 'react';

import { SupplierNotifications } from './SupplierNotifications/SupplierNotifications';
import style from './SupplierProfilePage.module.scss';

import { SupplierBusinessInfoChangeForm, SupplierPersonalInfoChangeForm } from '.';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { AccountManagement } from 'elements';
import { getCompanyNumberEmployees, getCountries } from 'store/reducers/commonSlice';
import {
  getBusinessInfo,
  getSupplierNotifications,
  supplierProgressLoadingSelector,
} from 'store/reducers/supplier/profile';
import { fetchCompanyLogo } from 'store/reducers/supplier/profile/thunks';
import { getPersonalInfo } from 'store/reducers/userSlice';
import { LoaderLinear } from 'ui-kit';

export const SupplierProfilePage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const isProgressLoading = useAppSelector(supplierProgressLoadingSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(getCountries());
      await dispatch(getPersonalInfo());
      await dispatch(getBusinessInfo());
      await dispatch(getCompanyNumberEmployees());
      await dispatch(getSupplierNotifications());

      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]); // notifications не добавил так как дважды уйдут все запросы, сдесь это не надо

  if (isLoading) {
    return <LoaderLinear />;
  }

  return (
    <div className={style.supplier_cabinet}>
      {isProgressLoading === LoadingStatusEnum.Loading && <LoaderLinear />}
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
