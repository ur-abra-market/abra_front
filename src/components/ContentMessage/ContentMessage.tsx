import React, { FC } from 'react';

import style from './ContentMessage.module.css';
import cn from "classnames";

interface ContentMessageProps {
  title: string;
  text: string;
  className?:string
}
const ContentMessage: FC<ContentMessageProps> = ({ title, text,className }) => {
  return (
    <>
      <div className={cn(style.header, className)}>{title}</div>
      <div className={style.subheader}>{text}</div>
    </>
  );
};

export default ContentMessage;
