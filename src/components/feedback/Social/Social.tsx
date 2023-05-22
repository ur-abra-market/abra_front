import React, { FC } from 'react';

import cn from 'classnames';

import { ReactComponent as Google } from '../../../assets/img/icons/google_c.svg';
import { ReactComponent as Instagram } from '../../../assets/img/icons/instagram_c.svg';
import { ReactComponent as Telegram } from '../../../assets/img/icons/telegram_c.svg';
import { ReactComponent as Vk } from '../../../assets/img/icons/vk_c.svg';

import style from './Social.module.css';
import { SocialProps } from './Social.props';

const LINKS = [
  { href: 'https://telegram.com', icon: Telegram },
  { href: 'https://instagram.com', icon: Instagram },
  { href: 'https://vk.com', icon: Vk },
  { href: 'https://google.com', icon: Google },
];
const Social: FC<SocialProps> = (props): JSX.Element => {
  const { className } = props;
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

export default Social;
