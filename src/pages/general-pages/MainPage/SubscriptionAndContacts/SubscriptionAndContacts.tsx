import { Button, Input, SocialNetworks, WhatsappPhoneNumber, Title } from 'ui-kit';

import style from './SubscriptionAndContacts.module.scss';

export const SubscriptionAndContacts = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.subscribe_wrapper}>
          <Title className={style.subscribe_title}>
            Do you want to be the first
            <span className={style.subscribe_subtitle}>
              to know about new products and hype products?
            </span>
          </Title>

          <div className={style.input_box}>
            <Input className={style.input_email} placeholder="Enter your email address" />
            <Button className={style.button_subscribe} label="Subscribe" />
          </div>
        </div>
        <div className={style.our_media}>
          <div className={style.feedback_wrapper}>
            <Title className={style.phone_title} as="h3" size="s" weight="semi_bold">
              Contact Us via WhatsApp
            </Title>
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
