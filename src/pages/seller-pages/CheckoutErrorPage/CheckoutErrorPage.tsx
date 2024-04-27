import React from 'react';

import { Link } from 'react-router-dom';

import { WithLayout } from 'common/hocs/WithLayout';
import { Button, ButtonQuestion } from 'ui-kit';

import styles from './CheckoutErrorPage.module.scss';

export const CheckoutErrorPage = WithLayout((): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.error_container}>
        <p className={styles.text}>
          An error occurred while paying.
          <br /> Check your account balance and try again.
        </p>
        <Button className={styles.button}>Retry</Button>
        <p className={styles.info}>
          You can also pay for the order later in the{' '}
          <Link className={styles.link} to="/order_history">
            Order History
          </Link>{' '}
          section
        </p>
        <ButtonQuestion />
      </div>
    </div>
  );
}, 'additional');
