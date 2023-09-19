import React from 'react';

import style from './ContactSupport.module.scss';

import { Banner3Image } from 'assets/images';
import { WithLayout } from 'common/hocs/WithLayout';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { SocialNetworks, WhatsappPhoneNumber } from 'ui-kit';
import { Title } from 'ui-kit/Title/Title';

export const ContactSupportPage = WithLayout(() => {
  return (
    <div>
      <div className={style.image_container}>
        <LazyImage src={Banner3Image} alt="" type="default_image" />
      </div>

      <div className={style.content_container}>
        <Title className={style.title}>Got any questions? Contact us via WhatsApp</Title>

        <div className={style.contacts}>
          <WhatsappPhoneNumber />
        </div>

        <SocialNetworks />
      </div>
    </div>
  );
});
