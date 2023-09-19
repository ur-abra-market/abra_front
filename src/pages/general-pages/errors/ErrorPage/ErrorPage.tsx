import React from 'react';

import styles from './ErrorPage.module.scss';

import { Title } from 'ui-kit/Title/Title';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.error_page}>
      <Title font="s">Oops!</Title>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
