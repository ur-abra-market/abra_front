import React, { FC } from 'react';

import { HeaderSupplierProductsListPage } from './HeaderSupplierProductsListPage/HeaderSupplierProductsListPage';
import style from './NewSupplierProductsList.module.scss';
import { ProductsList } from './ProductsList/ProductsList';

import { WithLayout } from 'common/hocs/WithLayout';

export const NewSupplierProductsListPage: FC = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <HeaderSupplierProductsListPage />
      <ProductsList />
    </div>
  );
}, 'supplier');
