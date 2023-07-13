import React from 'react';

import style from './FeedbackAndQuestions.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const FeedbackAndQuestionsPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.feedback_container}>
      <h2>Coming soon...</h2>
    </div>
  );
}, 'supplier');
