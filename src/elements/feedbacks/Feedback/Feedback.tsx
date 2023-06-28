import React from 'react';

import style from './Feedback.module.scss';

import { Social, Subscribe, WhatsApp } from '.';

export const Feedback = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div>
          <Subscribe />
        </div>
        <div className={style.social_block}>
          <WhatsApp />
          <Social />
        </div>
      </div>
    </div>
  );
};
