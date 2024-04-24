import React from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { Button, ButtonQuestion } from 'ui-kit';

import styles from './CheckoutErrorPage.module.scss';

export const CheckoutErrorPage = WithLayout((): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.error_container}>
        <span className={styles.error_text}>
          An error occurred while paying.
          <br /> Check your account balance and try again.
        </span>
        <Button className={styles.error_button}>Retry</Button>
        <span className={styles.error_info}>
          You can also pay for the order later in the <u>Order History</u> section
        </span>
        <ButtonQuestion />
      </div>
    </div>
  );
}, 'additional');
