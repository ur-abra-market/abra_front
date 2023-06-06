import AccountManagement from '../../../../components/AccountManagement/AccountManagement';
import { SupplierBusinessProfileForm } from '../../supplier-pages-common';

import style from './SupplierAccountMainPage.module.css';

import { NotificationsChangeForm, SupplierPersonalInfo } from './index';

export const SupplierAccountMainPage = (): JSX.Element => {
  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <SupplierPersonalInfo />

        <div className={style.business_profile}>
          <SupplierBusinessProfileForm updateForm />
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
