import React from 'react';

import style from './ViewMoreProductsLink.module.scss';

import { PRODUCTS_LIST } from 'routes';
import { SimpleLink } from 'ui-kit/SimpleLink/SimpleLink';

export const ViewMoreProductsLink = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <SimpleLink color="accent" to={PRODUCTS_LIST} className={style.view_more_link}>
        View more
      </SimpleLink>
    </div>
  );
};
