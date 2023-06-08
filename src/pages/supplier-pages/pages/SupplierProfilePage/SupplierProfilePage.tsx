import { AccountManagement } from '../../../../components';

import style from './SupplierProfilePage.module.css';

import {
  NotificationsChangeForm,
  SupplierBusinessInfoChangeForm,
  SupplierPersonalInfoChangeForm,
} from '.';

export const SupplierProfilePage = (): JSX.Element => {
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
