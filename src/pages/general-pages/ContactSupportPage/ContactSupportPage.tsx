import React from 'react';

import style from './ContactSupport.module.scss';

import { Banner3Image } from 'assets/images';
import { WithLayout } from 'common/hocs/WithLayout';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { SocialNetworks, WhatsappPhoneNumber } from 'ui-kit';

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

        <SocialNetworks />
      </div>
    </div>
  );
});
