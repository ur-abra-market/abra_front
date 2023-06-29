import { useEffect } from 'react';

import { SupplierNotifications } from './SupplierNotifications/SupplierNotifications';
import style from './SupplierProfilePage.module.scss';

import { SupplierBusinessInfoChangeForm, SupplierPersonalInfoChangeForm } from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch } from 'common/hooks';
import { AccountManagement } from 'elements';
import { getCountries } from 'store/reducers/commonSlice';

export const SupplierProfilePage = WithLayout((): JSX.Element => {
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
          <SupplierNotifications />
        </div>
      </div>
    </div>
  );
}, 'supplier');
