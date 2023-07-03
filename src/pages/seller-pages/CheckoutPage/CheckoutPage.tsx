import React, { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import style from './CheckoutPage.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Footer } from 'layouts';
import HeaderForChangePages from 'old-components/HeaderForChangePages';
import CheckDelivery from 'old-components/ui/checkout/CheckDelivery';
import CheckItems from 'old-components/ui/checkout/CheckItems';
import CheckOrder from 'old-components/ui/checkout/CheckOrder';
import CheckPayment from 'old-components/ui/checkout/CheckPayment';
import { getCountries } from 'store/reducers/commonSlice';
import { ButtonInfo } from 'ui-kit';

export const CheckoutPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className={style.container}>
      <HeaderForChangePages />

      <div className={style.checkout_page}>
        <div className={style.checkout}>
          <CheckDelivery />
          {/* <div> */}
          {/*  <SellerAddresses /> */}
          {/* </div> */}

          <CheckPayment />
          <div className={style.checkout_items}>
            <CheckItems index="0" />
            <CheckItems index="1" />
          </div>
        </div>
        <CheckOrder />
      </div>
      <ButtonInfo className={style.info_bottom} />
      <Footer variant="default" />
    </div>
  );
};
