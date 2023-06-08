import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './Social.module.css';

import { GoogleIcon, InstagramIcon, TelegramIcon, VkIcon } from 'assets/icons';

export interface SocialProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const LINKS = [
  { href: 'https://telegram.com', icon: TelegramIcon },
  { href: 'https://instagram.com', icon: InstagramIcon },
  { href: 'https://vk.com', icon: VkIcon },
  { href: 'https://google.com', icon: GoogleIcon },
];

export const Social: FC<SocialProps> = ({ className }): JSX.Element => {
  const buildLinkList = (): JSX.Element[] => {
    return LINKS.map(({ href, icon: Icon }) => {
      return (
        <li key={href} className={style.li}>
          <a href={href} className={style.link} target="_blank" rel="noreferrer">
            <Icon />
          </a>
        </li>
      );
    });
  };

  return (
    <div className={cn(style.social, className)}>
      <div className={style.title}>We in social media</div>
      <ul className={style.list}>{buildLinkList()}</ul>
    </div>
  );
};
