import React, { useState } from 'react';

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

  return (
    <div className={styles.payment_adder_container}>
      <div className={styles.header}>
        <span className={styles.payment_title}>Payment Method</span>
        <div className={styles.payment_methods}>
          <VisaIcon />
          <MastercardIcon className={styles.icon_offset} />
          <PaypalIcon />
          <GooglePayIcon />
          <ApplePayIcon />
          <span className={styles.payment_title}>Online Transfer</span>
        </div>
      </div>

      <div className={styles.payment_methods_list}>
        {paymentMethods.map(payment => (
          <div
            key={payment.id}
            className={`${styles.payment_methods_item} ${
              payment.selected ? styles.selected : ''
            }`}
          >
            <MastercardIcon />
            <span className={styles.payment_methods_item_text}>OLGA ANDREEVA</span>
            <span className={styles.card_number}>•••• •••• •••• 5678</span>
            <EditPencilIcon className={styles.edit_icon} />
          </div>
        ))}

        <button
          type="button"
          className={`${styles.add_payment_button} ${isEven ? styles.fullwidth : ''}`}
          onClick={addPaymentHandler}
        >
          + Add a credit or debit card
        </button>
      </div>
    </div>
  );
};
