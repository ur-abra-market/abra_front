import React, { FC } from "react";
import style from './News.module.css'
type NewsType = {
  title:string
  text:string
  image: string
}
export const News:FC<NewsType> = ({title,text,image}) => {
  return (
      <div className={style.container_content}>
        <img src={image} className={style.image}/>
        <div className={style.text_container}>
          <p className={style.title}>{title}</p>
          <p className={style.text}>{text}</p>
        </div>
      </div>
  );
};
