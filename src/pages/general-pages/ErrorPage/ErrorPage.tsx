import React from 'react';

import styles from './ErrorPage.module.css';

export const ErrorPage = (): JSX.Element => {
  return (
    <div id="error-page" className={styles.error_page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
