import React, { FC } from 'react';

import { Paragraph, Title } from 'ui-kit';

import style from './ContentBox.module.scss';

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
      <Paragraph size="m" className={style.answer_text}>
        {answer}
      </Paragraph>
    </div>
  );
};
