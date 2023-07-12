import React from 'react';

import style from './WhatsappPhoneNumber.module.scss';

import { WhatsappIcon } from 'assets/icons';

export const WhatsappPhoneNumber = (): JSX.Element => {
  return (
    <a
      className={style.phone_number}
      href="https://wa.me/79119681844?text=Hi%2C%20"
      target="_blank"
      rel="noreferrer"
    >
      <WhatsappIcon width="33" />
      <span>+79119681844</span>
    </a>
  );
};
