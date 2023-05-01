import React, { FC } from 'react';

import style from './ContentBox.module.css';

type ContentBoxType = {
  question: string;
  answer: string;
};

const ContentBox: FC<ContentBoxType> = ({ question, answer }): JSX.Element => {
  return (
    <div className={style.box}>
      <p className={style.question_text}>{question}</p>
      <p className={style.answer_text}>{answer}</p>
    </div>
  );
};

export default ContentBox;
