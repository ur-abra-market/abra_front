import React from 'react';

import style from './FeedbackAndQuestions.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { Title } from 'ui-kit/Title/Title';

export const FeedbackAndQuestionsPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.feedback_container}>
      <Title>Coming soon...</Title>
    </div>
  );
}, 'supplier');
