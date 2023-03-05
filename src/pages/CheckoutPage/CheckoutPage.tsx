import React, { FC } from 'react';

import style from './CheckoutPage.module.css';

import CheckDelivery from 'components/ui/checkout/CheckDelivery';
import CheckItems from 'components/ui/checkout/CheckItems';
import CheckOrder from 'components/ui/checkout/CheckOrder';
import CheckPayment from 'components/ui/checkout/CheckPayment';
import AddressPopup from 'components/ui/popup/AddressPopup';
import PaymentPopup from 'components/ui/popup/PaymentPopup';

const CheckoutPage: FC = (): JSX.Element => {
  return (
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
      <AddressPopup />
      <PaymentPopup />
    </div>
  );
};

export default CheckoutPage;
