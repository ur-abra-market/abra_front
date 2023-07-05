import React, { useEffect } from 'react';

import CheckoutAddresses from './CheckoutAddresses/CheckoutAddresses';
import style from './CheckoutPage.module.scss';

import { useAppDispatch } from 'common/hooks';
import { AdditionalHeaderBlock } from 'elements';
import { Footer } from 'layouts';
import CheckItems from 'old-components/ui/checkout/CheckItems';
import CheckOrder from 'old-components/ui/checkout/CheckOrder';
import CheckPayment from 'old-components/ui/checkout/CheckPayment';
import { getCountries } from 'store/reducers/commonSlice';
import { ButtonInfo } from 'ui-kit';

export const CheckoutPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <AdditionalHeaderBlock />
      <div className={style.container}>
        <div className={style.checkout_page}>
          <div className={style.checkout_info}>
            <div className={style.section}>
              <CheckoutAddresses />
            </div>
            <div className={style.section}>
              <CheckPayment />
            </div>
            <div className={style.section}>
              <CheckItems index="0" />
              <CheckItems index="1" />
            </div>
          </div>
          <div className={style.section}>
            <CheckOrder />
          </div>
        </div>
      </div>
      <ButtonInfo className={style.info_bottom} />
      <Footer variant="default" />
    </div>
  );
};
