import React from 'react'
import style from './WhatsApp.module.css'

const WhatsApp = () => {
  return (
    <div className={style.whatsApp}>
      <div className={style.whatsApp__icon_text}>Contact Us via WhatsApp</div>
      <h2>+79385656431</h2>
      <a className={style.whatsApp__btn} href="whatsApp" target="_blank">
        <img src="./assets/icon/whatsapp.svg" alt="W" />
      </a>
    </div>
  )
}

export default WhatsApp
