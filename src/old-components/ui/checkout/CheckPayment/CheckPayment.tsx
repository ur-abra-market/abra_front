import { useState } from 'react';

import PaymentPopup from '../../popup/PaymentPopup';

import style from './CheckPayment.module.scss';

import {
  ApplePayIcon,
  GooglePayIcon,
  MastercardIcon,
  PaypalIcon,
  VisaIcon,
} from 'assets/icons';

const CheckPayment = (): JSX.Element => {
  const [modal, setModal] = useState(false);

  const onClick = (): void => {
    setModal(true);
  };

  return (
    <div className={style.check_payment}>
      <div className={style.check_payment_block}>
        <h4 className={style.check_payment_title}>Payment Method</h4>
        <div className={style.check_payment_block_kind}>
          <VisaIcon className={style.icon} />
          <MastercardIcon className={style.icon} />
          <PaypalIcon className={style.icon} />
          <GooglePayIcon className={style.icon} />
          <ApplePayIcon className={style.icon} />
          <span className={style.transfer_text}>Online Transfer</span>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={style.check_payment_add} onClick={onClick}>
        + Add a credit or debit card
      </div>
      <PaymentPopup modal={modal} setModal={setModal} />
    </div>
  );
};

export default CheckPayment;
