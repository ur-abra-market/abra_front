import React from 'react';

import { Link } from 'react-router-dom';

import style from './ViewMoreProducts.module.scss';

import { PRODUCTS_LIST } from 'routes';

export const ViewMoreProducts = (): JSX.Element => {
  return (
    <Link to={PRODUCTS_LIST} className={style.link}>
      <div className={style.view_more}>
        <span>View more</span>
      </div>
    </Link>
  );
};
