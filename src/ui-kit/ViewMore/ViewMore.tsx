import React from 'react';

import { Link } from 'react-router-dom';

import style from 'ui-kit/ViewMore/ViewMore.module.css';

export const ViewMore = (): JSX.Element => {
  return (
    <Link to={'products-list/*'}>
      <div className={style.view_more}>
        <span>View more</span>
      </div>
    </Link>
  );
};
