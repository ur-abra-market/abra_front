import React from "react";
import style from './ContentBox.module.css';

type ContentBoxType={
  value: number
  titleText: string
  content:string
}
export const ContentBox = (props:ContentBoxType) => {
  return (
    <div className={style.box}>
      <p className={style.value}>{props.value}</p>
      <div className={style.content}>
        <p className={style.title_text}>{props.titleText}</p>
        <p className={style.content_text}>{props.content}</p>
      </div>
    </div>
  );
};

