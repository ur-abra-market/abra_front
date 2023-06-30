import { useEffect } from 'react';

import Orders from './Orders/Orders';
import { SellerAddresses } from './SellerAddresses/SellerAddresses';
import { SellerNotifications } from './SellerNotifications/SellerNotifications';
import style from './SellerProfilePage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch } from 'common/hooks';
import { AccountManagement } from 'elements';
import { SellerPersonalInfoChangeForm } from 'pages/seller-pages/SellerProfilePage/SellerPersonalInfoChangeForm/SellerPersonalInfoChangeForm';
import { getCountries } from 'store/reducers/commonSlice';

export const SellerProfilePage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className={style.seller_cabinet}>
      <div className={style.seller_cabinet_content_wrapper}>
        <SellerPersonalInfoChangeForm />
        <div className={style.seller_info}>
          <div className={style.section}>
            <Orders />
          </div>

          <div className={style.section}>
            <SellerAddresses />
          </div>
        </div>

        <div className={style.account_details}>
          <AccountManagement />
        </div>

        <div className={style.notifications}>
          <SellerNotifications />
        </div>
      </div>
    </div>
  );
});
