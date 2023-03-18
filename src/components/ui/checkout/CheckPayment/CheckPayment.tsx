import React from 'react';

import { useDispatch } from 'react-redux';

import { ReactComponent as ApplePay } from '../../../../assets/img/icons/applepay.svg';
import { ReactComponent as GooglePay } from '../../../../assets/img/icons/gpay.svg';
import { ReactComponent as MasterCard } from '../../../../assets/img/icons/mastercard.svg';
import { ReactComponent as PayPal } from '../../../../assets/img/icons/pay.svg';
import { ReactComponent as T_T } from '../../../../assets/img/icons/T.svg';
import { ReactComponent as Visa } from '../../../../assets/img/icons/visa.svg';
import { payment } from '../../../../store/reducers/modalSlice';

import style from './CheckPayment.module.css';

const CheckPayment = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className={style.check_payment}>
      <div className={style.check_payment_block}>
        <h4 className={style.check_payment_title}>Payment Method</h4>
        <div className={style.check_payment_block_kind}>
          <Visa className={style.icon} />
          <MasterCard className={style.icon} />
          <T_T className={style.icon} />
          <PayPal className={style.icon} />
          <GooglePay className={style.icon} />
          <ApplePay className={style.icon} />
          <span className={style.transfer_text}>Online Transfer</span>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={style.check_payment_add} onClick={() => dispatch(payment(true))}>
        + Add a credit or debit card
      </div>
    </div>
  );
};

export default CheckPayment;
