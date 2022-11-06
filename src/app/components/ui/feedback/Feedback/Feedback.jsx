import React from 'react'
import FeedbackFAQ from '../FeedbackFAQ'
import WhatsApp from '../WhatsApp'
import Social from '../Social'
import Subscribe from '../Subscribe'
import style from './Feedback.module.css'

const Feedback = () => {
  return (
    <div className={style.feedback}>
      <div className={style.feedback__left}>
        <Subscribe />
        <Social />
      </div>
      <div className={style.feedback__center}></div>
      <div className={style.feedback__right}>
        <FeedbackFAQ />
        <div className={style.feedback__right_separator}>
          <div className={style.feedback__right_separator_line}></div>
          <div className={style.feedback__right_separator_text}>Or</div>
          <div className={style.feedback__right_separator_line}></div>
        </div>
        <WhatsApp />
      </div>
    </div>
  )
}

export default Feedback
