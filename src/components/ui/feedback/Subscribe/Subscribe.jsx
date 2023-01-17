import React from 'react';

import style from './Subscribe.module.css';

const Subscribe = () => {
  return (
    <div className={style.subscribe}>
      <h2>Do you want to be the first</h2>
      <h3>to know about new products and hype products?</h3>
      <div className={style.subscribe__form}>
        <input
          className={style.subscribe__form_email}
          type="text"
          placeholder="Enter your email address"
        />
        <button className={style.subscribe__form_submit}>Subscribe</button>
        <input type="submit" hidden />
      </div>
      <p>We never share your data with third parties</p>
    </div>
  );
};

export default Subscribe;
