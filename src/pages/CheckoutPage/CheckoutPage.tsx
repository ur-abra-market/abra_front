import React, { FC } from 'react';

import HeaderForChangePages from '../../components/HeaderForChangePages';
import Footer from '../../layouts/Footer';

import style from './CheckoutPage.module.css';

import CheckDelivery from 'components/ui/checkout/CheckDelivery';
import CheckItems from 'components/ui/checkout/CheckItems';
import CheckOrder from 'components/ui/checkout/CheckOrder';
import CheckPayment from 'components/ui/checkout/CheckPayment';

const CheckoutPage: FC = (): JSX.Element => {
  return (
    <>
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
      <Footer />
    </>
  );
};

export default CheckoutPage;
