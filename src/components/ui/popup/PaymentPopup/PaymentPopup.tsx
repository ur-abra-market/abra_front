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
    <div className={style.payment_popup} style={styles}>
      <div className={style.payment_popup_modal}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className={style.payment_popup_modal_exit}
          onClick={() => dispatch(payment(false))}
        />
        <div className={style.payment_popup_row1}>
          <h4>Add payment</h4>
          <Check label="Save the card for next orders" />
        </div>
        <div className={style.payment_popup_block}>
          <div className={style.payment_popup_block_title}>Card Info</div>
          <TextModal title="Card number" placeholder="Enter a card number" />
          <TextModal title="Card Holder" placeholder="Enter the first and last name" />
          <div className={style.payment_popup_block_row2}>
            <TextModal title="Expiration date" placeholder="MM/YY" />
            <TextModal title="CVV/CSC" placeholder="Enter a 3-4 digits code" />
          </div>
        </div>
        <div className={style.payment_popup_button}>Confirm</div>
      </div>
    </div>
  );
};

export default PaymentPopup;
