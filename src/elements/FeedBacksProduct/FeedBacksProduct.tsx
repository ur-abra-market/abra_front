import React from 'react';

import { Title } from 'ui-kit';

import style from './FeedBacksProduct.module.scss';

export const FeedBacksProduct = (): JSX.Element => {
  return (
    <div className={style.feedbacks_container}>
      <Title as="h3" className={style.title}>
        Feedbacks
      </Title>
    </div>
  );
};
