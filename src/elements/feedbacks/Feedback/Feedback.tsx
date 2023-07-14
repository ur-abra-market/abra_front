import React from 'react';

import style from './Feedback.module.scss';

import { Subscribe, WhatsApp } from '.';

import { SocialNetworks } from 'ui-kit';

export const Feedback = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div>
          <Subscribe />
        </div>
        <div className={style.social_block}>
          <WhatsApp />
          <SocialNetworks />
        </div>
      </div>
    </div>
  );
};
