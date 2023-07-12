import React from 'react';

import style from './ContactSupport.module.scss';

import { GoogleIcon, VkIcon } from 'assets/icons';
import { Banner3Image } from 'assets/images';
import { WithLayout } from 'common/hocs/WithLayout';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { WhatsappPhoneNumber } from 'ui-kit';

export const ContactSupportPage = WithLayout(() => {
  return (
    <div>
      <div className={style.image_container}>
        <LazyImage className={style.image_header} src={Banner3Image} alt="" />
      </div>

      <div className={style.content_container}>
        <h2 className={style.title}>Got any questions? Contact us via Whatsapp</h2>

        <div className={style.contacts}>
          <WhatsappPhoneNumber />
        </div>

        <div>
          <p className={style.social_network}>We in social media</p>
          <a href="/">
            <VkIcon className={style.social_icon} />
          </a>
          <a href="/">
            <GoogleIcon className={style.social_icon} />
          </a>
        </div>
      </div>
    </div>
  );
});
