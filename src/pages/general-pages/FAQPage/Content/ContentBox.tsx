import React, { FC } from 'react';

import style from './ContentBox.module.scss';

import { Title } from 'ui-kit';

interface IContentBox {
  question: string;
  answer: string;
}

export const ContentBox: FC<IContentBox> = ({ question, answer }): JSX.Element => {
  return (
    <div className={style.box}>
      <Title as="h3" size="xs" className={style.question_text}>
        {question}
      </Title>
      <p className={style.answer_text}>{answer}</p>
    </div>
  );
};
