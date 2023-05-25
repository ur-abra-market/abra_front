import React from 'react';

import { Link } from 'react-router-dom';

import style from './ViewMore.module.scss';

export const ViewMore = (): JSX.Element => {
  return (
    <Link to={'products-list/*'} className={style.link}>
      <div className={style.view_more}>
        <span>View more</span>
      </div>
    </Link>
  );
};
