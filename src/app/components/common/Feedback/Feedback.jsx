import React from 'react'
import FeedbackFAQ from '../FeedbackFAQ/FeedbackFAQ'
import WhatsApp from '../WhatsApp/WhatsApp'
import Social from '../Social/Social'
import Subscribe from '../Subscribe/Subscribe'
import './Feedback.css'

const Feedback = () => {
  return (
    <div className='Feedback'>
      <div className='Feedback__left'>
        <Subscribe />
        <Social />
      </div>          
      <div className='Feedback__center'></div>  
      <div className='Feedback__right'>
        <FeedbackFAQ />
        <div className='Feedback__right_separator'>
          <div className='Feedback__right_separator-line'></div>
          <div className='Feedback__right_separator-text'>Or</div>
          <div className='Feedback__right_separator-line'></div>
        </div>
        <WhatsApp />        
      </div>
    </div>
  )
}

export default Feedback