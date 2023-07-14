import React, { FC, useState } from 'react';

import { HeaderSearch } from './HeaderSearch/HeaderSearch';
import style from './HeaderSupplierProducts.module.scss';
import { ProductListSettings } from './ProductListSettings/ProductListSettings';

export const HeaderSupplierProducts: FC = () => {
  const [restFilters, setRestFilters] = useState(false);

  return (
    <div className={style.container}>
      <HeaderSearch restFilters={restFilters} setRestFilters={setRestFilters} />
      {restFilters && <ProductListSettings />}
    </div>
  );
};
