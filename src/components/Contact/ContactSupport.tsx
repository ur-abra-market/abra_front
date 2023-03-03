import React, { FC } from 'react';

import headerContact from '../../assets/img/icons/bacgrountContact.svg';
import google from '../../assets/img/icons/google_c.svg';
import vk from '../../assets/img/icons/vk_c.svg';
import whatsApp from '../../assets/img/icons/whatsapp.svg';
import { Layout } from '../../layouts/Layout/Layout';

import style from './ContactSupport.module.css';

export const ContactSupport: FC = () => {
  return (
    <Layout>
      <div>
        <img className={style.image_header} src={headerContact} alt="" />
        <div className={style.container}>
          <p className={style.title}>Got any questions? Contact us via Whatsapp</p>
          <div className={style.contacts}>
            <img src={whatsApp} className={style.image} alt="" />
            <p className={style.number_phone}>+79385656431</p>
          </div>
          <div>
            <p className={style.social_network}>We in social media</p>
            <a href="/">
              <img className={style.social_image} src={vk} alt="" />
            </a>
            <a href="/">
              <img className={style.social_image} src={google} alt="" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
