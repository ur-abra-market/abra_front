import { AccountManagementLink } from '../../../../components';
import { SupplierBusinessProfileForm } from '../../supplier-pages-common';

import style from './SupplierAccountMainPage.module.css';

import { NotificationsChangeForm, PersonalInfo } from './index';

export const SupplierAccountMainPage = (): JSX.Element => {
  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <PersonalInfo />

        <div className={style.business_profile}>
          <SupplierBusinessProfileForm updateForm />
        </div>

        <div className={style.account_details}>
          <AccountManagementLink
            linkLabel="Change your email"
            path="/changeEmail"
            description="(You will have to confirm a new email)"
          />
          <AccountManagementLink
            linkLabel=" Change your password"
            path="/changePassword"
            description="(In case if you forgot a current password or need a stronger one)"
          />
          <AccountManagementLink
            linkLabel=" Remove the account?"
            path="/" // todo fix
            description="(All your data including order history will be deleted)"
          />
        </div>

        <div className={style.notifications}>
          <NotificationsChangeForm />
        </div>
      </div>
    </div>
  );
};
