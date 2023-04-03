import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import HeaderForChangePages from '../../components/HeaderForChangePages';
import InfoBtn from '../../components/ui-kit/InfoBtn/InfoBtn';
import Footer from '../../layouts/Footer';
import { useAppSelector } from '../../store/hooks';

import style from './CheckoutPage.module.css';

import CheckDelivery from 'components/ui/checkout/CheckDelivery';
import CheckItems from 'components/ui/checkout/CheckItems';
import CheckOrder from 'components/ui/checkout/CheckOrder';
import CheckPayment from 'components/ui/checkout/CheckPayment';

const CheckoutPage: FC = (): JSX.Element => {
  const { isAuth } = useAppSelector(state => state.login);

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
      <InfoBtn className={style.info_bottom} />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
