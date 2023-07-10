import { useState } from 'react';

import style from './CheckPayment.module.scss';

import {
  ApplePayIcon,
  GooglePayIcon,
  MastercardIcon,
  PaypalIcon,
  VisaIcon,
} from 'assets/icons';
import PaymentPopup from 'old-components/ui/popup/PaymentPopup';

const CheckPayment = (): JSX.Element => {
  const [modal, setModal] = useState(false);

  const onClick = (): void => {
    setModal(true);
  };

  return (
    <>
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
      <button type="button" className={style.check_payment_add} onClick={onClick}>
        + Add a credit or debit card
      </button>
      <PaymentPopup modal={modal} setModal={setModal} />
    </>
  );
};

export default CheckPayment;
