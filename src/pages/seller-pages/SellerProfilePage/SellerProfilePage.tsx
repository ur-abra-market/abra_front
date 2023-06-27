import { useEffect } from 'react';

import { useAppDispatch } from '../../../common/hooks';
import { AccountManagement } from '../../../components';

import { SellerAddresses } from './Addresses/SellerAddresses';
import Orders from './Orders/Orders';
import { SellerNotifications } from './SellerNotifications/SellerNotifications';

import { WithLayout } from 'common/hocs/WithLayout';
import { SellerPersonalInfoChangeForm } from 'pages/seller-pages/SellerProfilePage/SellerPersonalInfoChangeForm/SellerPersonalInfoChangeForm';
import style from 'pages/seller-pages/SellerProfilePage/SellerProfilePage.module.css';
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
