import React from 'react';

import style from './SubscriptionAndContacts.module.scss';

import { Button, Input, SocialNetworks, WhatsappPhoneNumber } from 'ui-kit';

export const SubscriptionAndContacts = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.subscribe_wrapper}>
          <div className={style.text}>
            <div className={style.subscribe_title}>Do you want to be the first</div>
            <div className={style.subscribe_subtitle}>
              to know about new products and hype products?
            </div>
          </div>
          <div className={style.input_box}>
            <Input placeholder="Enter your email address" />
            <Button label="Subscribe" />
          </div>
        </div>
        <div className={style.our_media}>
          <div className={style.feedback_wrapper}>
            <div className={style.phone_title}>Contact Us via WhatsApp</div>
            <WhatsappPhoneNumber />
          </div>

          <div className={style.social_network_wrapper}>
            <SocialNetworks />
          </div>
        </div>
      </div>
    </div>
  );
};
