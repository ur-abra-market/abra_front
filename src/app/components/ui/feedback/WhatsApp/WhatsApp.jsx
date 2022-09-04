import React from 'react';
import './WhatsApp.css';

const WhatsApp = () => {
  return (
    <div className='WhatsApp'>
      <div className='WhatsApp__icon_text'>Contact Us via WhatsApp</div>
      <h2>+79385656431</h2>
      <a className='WhatsApp__btn' href="whatsApp" target='_blank'>
        <img src="./assets/icon/whatsapp.svg" alt="W" />
      </a>     
    </div>
  )
}

export default WhatsApp