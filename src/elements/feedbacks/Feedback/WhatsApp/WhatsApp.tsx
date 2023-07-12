import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './WhatsApp.module.scss';

import { WhatsappIcon } from 'assets/icons';

export interface IWhatsApp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const WhatsApp: FC<IWhatsApp> = (props): JSX.Element => {
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
        <WhatsappIcon className={style.icon} />
        <span>+79119681844</span>
      </a>
    </div>
  );
};
