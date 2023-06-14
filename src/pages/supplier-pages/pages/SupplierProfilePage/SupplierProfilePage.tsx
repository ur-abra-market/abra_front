import { useEffect } from 'react';

import { useAppDispatch } from '../../../../common/hooks';
import { AccountManagement } from '../../../../components';
import { getCountries } from '../../../../store/reducers/commonSlice';

import style from './SupplierProfilePage.module.css';

import {
  NotificationsChangeForm,
  SupplierBusinessInfoChangeForm,
  SupplierPersonalInfoChangeForm,
} from '.';

export const SupplierProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <SupplierPersonalInfoChangeForm />

        <div className={style.business_profile}>
          <SupplierBusinessInfoChangeForm />
        </div>

        <div className={style.account_details}>
          <AccountManagement />
        </div>

        <div className={style.notifications}>
          <NotificationsChangeForm />
        </div>
      </div>
    </div>
  );
};
