import React from 'react';

import styles from './ErrorPage.module.scss';

import { Title } from 'ui-kit';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.error_page}>
      <Title size="s">Oops!</Title>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
