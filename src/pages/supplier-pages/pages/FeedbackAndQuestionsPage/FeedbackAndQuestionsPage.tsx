import React from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit';

import style from './FeedbackAndQuestions.module.scss';

export const FeedbackAndQuestionsPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.feedback_container}>
      <Title>Coming soon...</Title>
    </div>
  );
}, 'supplier');
