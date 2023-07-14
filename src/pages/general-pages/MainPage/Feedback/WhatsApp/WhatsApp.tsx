import React from 'react';

import style from './WhatsApp.module.scss';

import { WhatsappPhoneNumber } from 'ui-kit';

export const WhatsApp = (): JSX.Element => (
  <div className={style.wrapper}>
    <div className={style.title}>Contact Us via WhatsApp</div>
    <WhatsappPhoneNumber />
  </div>
);
