import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './SocialNetworks.module.scss';

import { GoogleIcon, InstagramIcon, TelegramIcon, VkIcon } from 'assets/icons';

export interface SocialProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const SOCIAL_NETWORKS = [
  { href: '#', icon: TelegramIcon },
  { href: '#', icon: InstagramIcon },
  { href: '#', icon: VkIcon },
  { href: '#', icon: GoogleIcon },
];

export const SocialNetworks: FC<SocialProps> = ({ className }): JSX.Element => {
  const networks = SOCIAL_NETWORKS.map(({ href, icon: Icon }, i) => {
    return (
      <li key={i + 1} className={style.network}>
        <a href={href} className={style.link} rel="noreferrer">
          <Icon />
        </a>
      </li>
    );
  });

  return (
    <div className={cn(style.social, className)}>
      <div className={style.title}>We in social media</div>
      <ul className={style.networks_list}>{networks}</ul>
    </div>
  );
};
