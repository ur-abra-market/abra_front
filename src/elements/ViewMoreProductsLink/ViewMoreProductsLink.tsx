import React from 'react';

import { PRODUCTS_LIST } from 'routes';
import { SimpleLink } from 'ui-kit/SimpleLink/SimpleLink';

import style from './ViewMoreProductsLink.module.scss';

export const ViewMoreProductsLink = (): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <SimpleLink color="accent" to={PRODUCTS_LIST} className={style.view_more_link}>
        View more
      </SimpleLink>
    </div>
  );
};
