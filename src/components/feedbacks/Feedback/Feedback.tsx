import React from 'react';

import { Container } from '../../../ui-kit';

import style from './Feedback.module.css';

import { Social, Subscribe, WhatsApp } from './index';

export const Feedback = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <Container className={style.container}>
        <div>
          <Subscribe />
        </div>
        <div className={style.social_block}>
          <WhatsApp />
          <Social />
        </div>
      </Container>
    </div>
  );
};
