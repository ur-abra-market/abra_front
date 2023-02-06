import React, { FC } from 'react';

import style from './ContentMessage.module.css';

interface ContentMessageProps {
  title: string;
  text: string;
}
const ContentMessage: FC<ContentMessageProps> = ({ title, text }) => {
  return (
    <>
      <div className={style.header}>{title}</div>
      <div className={style.subheader}>{text}</div>
    </>
  );
};

export default ContentMessage;
