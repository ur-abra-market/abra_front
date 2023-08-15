import React from 'react';

import styles from './ErrorPage.module.scss';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.error_page}>
      <h2>Oops!</h2>
      <h3>Sorry, an unexpected error has occurred.</h3>
    </div>
  );
};
