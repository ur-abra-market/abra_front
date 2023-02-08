import React from 'react';

import FeedbackFAQ from '../FeedbackFAQ';
import Social from '../Social';
import Subscribe from '../Subscribe';
import WhatsApp from '../WhatsApp';

import style from './Feedback.module.css';

const Feedback = (): JSX.Element => {
  return (
    <div className={style.feedback}>
      <div className={style.feedback__left}>
        <Subscribe />
        <Social />
      </div>
      <div className={style.feedback__center} />
      <div className={style.feedback__right}>
        <FeedbackFAQ />
        <div className={style.feedback__right_separator}>
          <div className={style.feedback__right_separator_line} />
          <div className={style.feedback__right_separator_text}>Or</div>
          <div className={style.feedback__right_separator_line} />
        </div>
        <WhatsApp />
      </div>
    </div>
  );
};

export default Feedback;
