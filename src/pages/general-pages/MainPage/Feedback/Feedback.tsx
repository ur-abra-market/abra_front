import React from 'react';

import style from './Feedback.module.scss';

import { Subscribe, WhatsApp } from './index';

import { SocialNetworks } from 'ui-kit';

export const Feedback = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Subscribe />
        <WhatsApp />
        <SocialNetworks />
      </div>
    </div>
  );
};
