import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { payment } from '../../../../store/reducers/modalSlice';
import Check from '../../../Check';
import TextModal from '../../../TextModal';

import style from './PaymentPopup.module.css';

const PaymentPopup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(state => state.modal.isPayment);
  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };

  return (
    <div className={style.paymentPopup} style={styles}>
      <div className={style.paymentPopup__modal}>
        <div
          className={style.paymentPopup__modal_exit}
          onClick={() => dispatch(payment(false))}
        />
        <div className={style.paymentPopup__row1}>
          <h4>Add payment</h4>
          <Check label="Save the card for next orders" />
        </div>
        <div className={style.paymentPopup__block}>
          <div className={style.paymentPopup__block_title}>Card Info</div>
          <TextModal title="Card number" placeholder="Enter a card number" />
          <TextModal title="Card Holder" placeholder="Enter the first and last name" />
          <div className={style.paymentPopup__block_row2}>
            <TextModal title="Expiration date" placeholder="MM/YY" />
            <TextModal title="CVV/CSC" placeholder="Enter a 3-4 digits code" />
          </div>
        </div>
        <div className={style.paymentPopup__button}>Confirm</div>
      </div>
    </div>
  );
};

export default PaymentPopup;
