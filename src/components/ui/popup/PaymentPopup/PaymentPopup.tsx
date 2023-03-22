import React from 'react';

import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { payment } from '../../../../store/reducers/modalSlice';
import TextModal from '../../../TextModal';
import { Button } from '../../../ui-kit';

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
        <div className={style.payment_popup_row1}>
          <h4 className={style.payment_popup_title_text}>Add Payment Card</h4>
          <Exit
            className={style.payment_popup_modal_exit}
            onClick={() => dispatch(payment(false))}
          />
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
        <Button className={style.payment_popup_button}>Confirm</Button>
      </div>
    </div>
  );
};

export default PaymentPopup;
