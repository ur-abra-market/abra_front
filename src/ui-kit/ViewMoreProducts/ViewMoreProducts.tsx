import React from 'react';

import { Link } from 'react-router-dom';

import { SELLER_PRODUCTS } from '../../routes';

import style from './ViewMoreProducts.module.scss';

export const ViewMoreProducts = (): JSX.Element => {
  return (
    <Link to={SELLER_PRODUCTS} className={style.link}>
      <div className={style.view_more}>
        <span>View more</span>
      </div>
    </Link>
  );
};
