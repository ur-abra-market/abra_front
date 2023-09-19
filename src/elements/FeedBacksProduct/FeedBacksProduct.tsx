import React from 'react';

import style from './FeedBacksProduct.module.scss';

import { Title } from 'ui-kit/Title/Title';

export const FeedBacksProduct = (): JSX.Element => {
  return (
    <div className={style.feedbacks_container}>
      <Title as="h3" className={style.title}>
        Feedbacks
      </Title>
    </div>
  );
};
