import style from './ContactSupport.module.css';

import { GoogleIcon, VkIcon, WhatsappIcon } from 'assets/icons';
import { Banner3Image } from 'assets/images';
import { WithLayout } from 'common/hocs/WithLayout';

export const ContactSupportPage = WithLayout(() => {
  return (
    <div>
      <img className={style.image_header} src={Banner3Image} alt="" />
      <div className={style.container}>
        <p className={style.title}>Got any questions? Contact us via Whatsapp</p>
        <div className={style.contacts}>
          <WhatsappIcon className={style.image} />
          <p className={style.number_phone}>+79385656431</p>
        </div>
        <div>
          <p className={style.social_network}>We in social media</p>
          <a href="/">
            <VkIcon className={style.social_image} />
          </a>
          <a href="/">
            <GoogleIcon className={style.social_image} />
          </a>
        </div>
      </div>
    </div>
  );
});
