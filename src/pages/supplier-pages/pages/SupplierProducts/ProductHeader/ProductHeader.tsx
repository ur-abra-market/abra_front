import React, { useState } from 'react';

import { FilterBlock } from './FilterBlock/FilterBlock';

import { useAppSelector } from 'common/hooks';
import { FilterSwitcher } from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterSwitcher/FilterSwitcher';
import { isLoadingSelector } from 'store/reducers/supplier/product';
import { Search } from 'ui-kit';

import style from './ProductHeader.module.scss';

export const ProductHeader = (): JSX.Element => {
  const isLoading = useAppSelector(isLoadingSelector);
  const [restFilters, setRestFilters] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.inner_wrapper}>
        <Search
          disabled={isLoading}
          placeholder="Search by Name"
          className={style.search}
        />
        <FilterSwitcher restFilters={restFilters} setRestFilters={setRestFilters} />
      </div>
      <FilterBlock isOpen={restFilters} />
    </div>
  );
};
