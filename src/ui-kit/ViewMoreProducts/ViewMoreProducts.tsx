import React, { KeyboardEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import style from './ViewMoreProducts.module.scss';

import { PRODUCTS_LIST } from 'routes';

export const ViewMoreProducts = (): JSX.Element => {
  const navigate = useNavigate();
  const handleLinkClick = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') navigate(PRODUCTS_LIST);
  };

  return (
    <Link tabIndex={-1} to={PRODUCTS_LIST} className={style.link}>
      <div
        role="link"
        tabIndex={0}
        onKeyPress={handleLinkClick}
        className={style.view_more}
      >
        <span>View more</span>
      </div>
    </Link>
  );
};
