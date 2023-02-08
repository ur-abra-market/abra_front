import React from 'react';

import style from './Social.module.css';

const Social = (): JSX.Element => {
  return (
    <div className={style.social}>
      <div className={style.social__text}>We in social media</div>
      <ul className={style.social__list}>
        <li className={style.social__list_btn}>
          <a href="google" target="_blank">
            <img src="./assets/icon/google.svg" alt="G" />
          </a>
        </li>
        <li className={style.social__list_btn}>
          <a href="telegeam" target="_blank">
            <img src="./assets/icon/telegram.svg" alt="T" />
          </a>
        </li>
        <li className={style.social__list_btn}>
          <a href="vk" target="_blank">
            <img src="./assets/icon/fa_vk.svg" alt="V" />
          </a>
        </li>
        <li className={style.social__list_btn}>
          <a href="instagram" target="_blank">
            <img src="./assets/icon/instogram.svg" alt="In" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Social;
