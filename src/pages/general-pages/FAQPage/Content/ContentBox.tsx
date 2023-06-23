import React, { FC } from 'react';

import style from './ContentBox.module.scss';

interface IContentBox {
  question: string;
  answer: string;
}

export const ContentBox: FC<IContentBox> = ({ question, answer }): JSX.Element => {
  return (
    <div className={style.box}>
      <p className={style.question_text}>{question}</p>
      <p className={style.answer_text}>{answer}</p>
    </div>
  );
};
