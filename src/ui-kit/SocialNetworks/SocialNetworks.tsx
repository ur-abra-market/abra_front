import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import { GoogleIcon, InstagramIcon, TelegramIcon, VkIcon } from 'assets/icons';
import { Title } from 'ui-kit/Title/Title';

import style from './SocialNetworks.module.scss';

export interface SocialProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?: 'm' | 's';
}

const SOCIAL_NETWORKS = [
  { id: 1, href: '#', icon: TelegramIcon },
  { id: 2, href: '#', icon: InstagramIcon },
  { id: 3, href: '#', icon: VkIcon },
  { id: 4, href: '#', icon: GoogleIcon },
];

export const SocialNetworks: FC<SocialProps> = ({
  className,
  variant = 's',
}): JSX.Element => {
  const networks = SOCIAL_NETWORKS.map(({ href, icon: Icon, id }) => (
    <li key={id} className={style.network}>
      <a href={href} className={style.link} rel="noreferrer">
        <Icon />
      </a>
    </li>
  ));

  return (
    <div className={className}>
      <Title as="h3" size={variant} weight="semi_bold" className={style.title}>
        We in social media
      </Title>
      <ul className={style.networks_list}>{networks}</ul>
    </div>
  );
};
