import { useEffect } from 'react';

import { useAppDispatch } from '../../../common/hooks';
import { AccountManagement } from '../../../components';
import { getSellerNotifications } from '../../../store/reducers/seller/profile';

import Orders from './Orders/Orders';
import { SellerNotifications } from './SellerNotifications/SellerNotifications';
import { SellerPersonalInfoAddresses } from './SellerPersonalInfoAddresses/SellerPersonalInfoAddresses';
import style from './SellerProfilePage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { SellerPersonalInfoChangeForm } from 'pages/seller-pages/SellerProfilePage/SellerPersonalInfoChangeForm/SellerPersonalInfoChangeForm';
import { getCountries } from 'store/reducers/commonSlice';
import { getSellerAddresses } from 'store/reducers/seller/profile/thunks';

export const SellerProfilePage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerAddresses());
    dispatch(getSellerNotifications());
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
            <SellerPersonalInfoAddresses />
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
