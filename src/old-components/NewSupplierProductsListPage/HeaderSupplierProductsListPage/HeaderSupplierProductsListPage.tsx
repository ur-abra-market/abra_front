import React, { FC, useState } from 'react';

import { HeaderSearch } from './HeaderSearch/HeaderSearch';
import style from './HeaderSupplierProductsListPage.module.scss';
import PaginationSettings from './PaginationSettings/PaginationSettings';
import { ProductListSettings } from './ProductListSettings/ProductListSettings';

export const HeaderSupplierProductsListPage: FC = () => {
  const [restFilters, setRestFilters] = useState(false);

  return (
    <div className={style.container}>
      <HeaderSearch restFilters={restFilters} setRestFilters={setRestFilters} />
      {restFilters && <ProductListSettings />}
      <PaginationSettings />
    </div>
  );
};
