import React, { useState } from 'react';

import cn from 'classnames';

import {
  ApplePayIcon,
  EditPencilIcon,
  GooglePayIcon,
  MastercardIcon,
  PaypalIcon,
  VisaIcon,
} from 'assets/icons';

import styles from './PaymentMethodAdder.module.scss';

interface IPayment {
  id: number;
  selected: boolean;
}
export const PaymentMethodAdder = (): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState<IPayment[]>([]);

  const addPaymentHandler = (): void => {
    setPaymentMethods(prev => [...prev, { id: prev.length + 1, selected: false }]);
  };

  const isEven = paymentMethods.length % 2 === 0;
  const buttonClass = cn(styles.button, {
    [styles.fullwidth]: isEven,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Payment Method</p>
        <div className={styles.payment_methods}>
          <VisaIcon />
          <MastercardIcon className={styles.icon_offset} />
          <PaypalIcon />
          <GooglePayIcon />
          <ApplePayIcon />
          <p className={styles.payment_title}>Online Transfer</p>
        </div>
      </div>

      <div className={styles.list}>
        {paymentMethods.map(payment => (
          <div
            key={payment.id}
            className={cn(styles.item, {
              [styles.selected]: payment.selected,
            })}
          >
            <MastercardIcon />
            <p className={styles.item_text}>OLGA ANDREEVA</p>
            <p className={styles.card_number}>•••• •••• •••• 5678</p>
            <EditPencilIcon className={styles.edit_icon} />
          </div>
        ))}

        <button type="button" className={buttonClass} onClick={addPaymentHandler}>
          + Add a credit or debit card
        </button>
      </div>
    </div>
  );
};
