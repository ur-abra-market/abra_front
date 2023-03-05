import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import style from './FormTitle.module.css';

interface FormTitleProps {
  title?: string;
  text?: string;
  step?: string;
  link?: string;
}
const FormTitle: FC<FormTitleProps> = ({ title, text, step, link }) => {
  return (
    <div className={style.text_wrapper}>
      <p className={style.title}>{title}</p>
      <p className={style.text}>{text}</p>

      <div className={style.step_wrapper}>
        <p className={style.step}>{step}</p>
        <Link to="/" className={style.link}>
          {link}
        </Link>
      </div>
    </div>
  );
};

export default FormTitle;
