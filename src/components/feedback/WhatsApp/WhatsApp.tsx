import React, { FC } from 'react';

import cn from 'classnames';

import { ReactComponent as WhatsAppIcon } from '../../../assets/img/icons/whatsapp.svg';

import style from './WhatsApp.module.css';
import { WhatsAppProps } from './WhatsApp.props';

const WhatsApp: FC<WhatsAppProps> = (props): JSX.Element => {
  const { className } = props;

  return (
    <div className={cn(style.wrapper, className)}>
      <div className={style.title}>Contact Us via WhatsApp</div>
      <a
        className={style.link}
        href="https://wa.me/79385656431?text=Hi%2C%20"
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon className={style.icon} />
        <span>+79385656431</span>
      </a>
    </div>
  );
};

export default WhatsApp;
