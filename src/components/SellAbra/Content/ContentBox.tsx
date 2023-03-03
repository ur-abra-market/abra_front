import React, { FC } from 'react';

import style from './ContentBox.module.css';

type ContentBoxType = {
  value: number;
  titleText: string;
  content: string;
};
export const ContentBox: FC<ContentBoxType> = props => {
  const { value, content, titleText } = props;

  return (
    <div className={style.box}>
      <p className={style.value}>{value}</p>
      <div className={style.content}>
        <p className={style.title_text}>{titleText}</p>
        <p className={style.content_text}>{content}</p>
      </div>
    </div>
  );
};
