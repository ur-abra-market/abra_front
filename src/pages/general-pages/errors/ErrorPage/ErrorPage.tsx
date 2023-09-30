import React from 'react';

import styles from './ErrorPage.module.scss';

import { Paragraph, Title } from 'ui-kit';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.error_page}>
      <Title size="s">Oops!</Title>
      <Paragraph size="m" weight="semi_bold">
        Sorry, an unexpected error has occurred.
      </Paragraph>
    </div>
  );
};
