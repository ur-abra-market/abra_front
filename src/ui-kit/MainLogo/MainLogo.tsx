import React from 'react';

import { Link } from 'react-router-dom';

import style from './MainLogo.module.scss';

export const MainLogo = (): JSX.Element => {
  return (
    <h1 className={style.title}>
      <Link to="/" className={style.link}>
        Abra
      </Link>
    </h1>
  );
};
