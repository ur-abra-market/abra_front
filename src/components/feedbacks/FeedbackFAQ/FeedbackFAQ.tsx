import React from 'react';

import style from './FeedbackFAQ.module.scss';

const FeedbackFAQ = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <h2>Do you have any questions?</h2>
      <div className={style.text}>Find answers in the FAQ</div>
    </div>
  );
};

export default FeedbackFAQ;
