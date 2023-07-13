import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './WhatsApp.module.scss';

import { WhatsappPhoneNumber } from 'ui-kit';

export interface IWhatsApp
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const WhatsApp: FC<IWhatsApp> = (props): JSX.Element => {
  const { className } = props;

  return (
    <div className={cn(style.wrapper, className)}>
      <div className={style.title}>Contact Us via WhatsApp</div>
      <WhatsappPhoneNumber />
    </div>
  );
};
