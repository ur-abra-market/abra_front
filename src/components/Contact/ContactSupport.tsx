import React from "react";
import { Layout } from "../../layouts/Layout/Layout";
import headerContact from "../../assets/img/icons/bacgrountContact.svg";
import whatsApp from "../../assets/img/icons/whatsapp.svg";
import vk from "../../assets/img/icons/vk_c.svg";
import google from "../../assets/img/icons/google_c.svg";
import style from "./ContactSupport.module.css";

export const ContactSupport = () => {
  return (
    <Layout>
      <div>
        <img className={style.image_header} src={headerContact} />
        <div className={style.container}>
          <p className={style.title}>Got any questions? Contact us via Whatsapp</p>
          <div className={style.contacts}>
            <img src={whatsApp} className={style.image} />
            <p className={style.number_phone}>+79385656431</p>
          </div>
          <div>
            <p className={style.social_network}>We in social media</p>
            <a href={"/"}><img className={style.social_image} src={vk} /></a>
            <a href={"/"}><img className={style.social_image} src={google} /></a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

