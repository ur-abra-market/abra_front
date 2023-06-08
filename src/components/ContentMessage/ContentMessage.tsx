import React, { FC } from 'react';

import cn from 'classnames';

import style from './ContentMessage.module.css';

interface ContentMessageProps {
  title: string;
  text: string;
  className?: string;
}
export const ContentMessage: FC<ContentMessageProps> = ({ title, text, className }) => {
  return (
    <>
      <div className={cn(style.header, className)}>{title}</div>
      <div className={style.subheader}>{text}</div>
    </>
  );
};
