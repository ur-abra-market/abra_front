import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../../common/hooks';
import HeaderForChangePages from '../../../old-components/HeaderForChangePages';

import style from './CheckoutPage.module.css';

import { Footer } from 'layouts/Footer';
import CheckDelivery from 'old-components/ui/checkout/CheckDelivery';
import CheckItems from 'old-components/ui/checkout/CheckItems';
import CheckOrder from 'old-components/ui/checkout/CheckOrder';
import CheckPayment from 'old-components/ui/checkout/CheckPayment';
import { ButtonInfo } from 'ui-kit';

export const CheckoutPage = (): JSX.Element => {
  const isAuth = useAppSelector(state => state.auth.isAuthorized);

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className={style.container}>
      <HeaderForChangePages />

      <div className={style.checkout_page}>
        <div className={style.checkout}>
          <CheckDelivery />
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
