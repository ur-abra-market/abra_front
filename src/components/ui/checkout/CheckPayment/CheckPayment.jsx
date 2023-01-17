import React from 'react';

import { useDispatch } from 'react-redux';

import { payment } from '../../../../store/reducers/modalSlice';

import style from './CheckPayment.module.css';

const CheckPayment = () => {
  const dispatch = useDispatch();

  return (
    <div className={style.checkPayment}>
      <div className={style.checkPayment__block}>
        <h4>Payment Method</h4>
        <div className={style.checkPayment__block_kind}>
          <div className={style.checkPayment__block_kind_box} />
          <div className={style.checkPayment__block_kind_cart} />
        </div>
      </div>
      <div className={style.checkPayment_add} onClick={() => dispatch(payment(true))}>
        + Add a credit or debit card
      </div>
    </div>
  );
};

export default CheckPayment;
