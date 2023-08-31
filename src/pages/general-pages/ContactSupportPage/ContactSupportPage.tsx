import React from 'react';

import { NavLink } from 'react-router-dom';

import style from './ContactSupport.module.scss';

import { Banner3Image } from 'assets/images';
import { WithLayout } from 'common/hocs/WithLayout';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from 'routes';
import { SocialNetworks, WhatsappPhoneNumber } from 'ui-kit';

export const ContactSupportPage = WithLayout(() => {
  return (
    <div>
      <div className={style.image_container}>
        <LazyImage
          className={style.image_header}
          src={Banner3Image}
          alt=""
          type="default_image"
        />
      </div>

      <div className={style.content_container}>
        <h2 className={style.title}>Got any questions? Contact us via WhatsApp</h2>

        <div className={style.contacts}>
          <WhatsappPhoneNumber />
        </div>

        <SocialNetworks className={style.social} />
      </div>
      <div className={style.mobile_copyright}>
        © 2022 Abra.&nbsp;
        <NavLink className={style.link} to={TERMS_AND_CONDITIONS}>
          Terms & conditions
        </NavLink>
        &nbsp;and&nbsp;
        <NavLink className={style.link} to={PRIVACY_POLICY}>
          Privacy policy
        </NavLink>
      </div>
    </div>
  );
});
