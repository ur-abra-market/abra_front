import React, { useState } from 'react';

import { FilterBlock } from './FilterBlock/FilterBlock';
import style from './ProductHeader.module.scss';

import { useAppSelector } from 'common/hooks';
import { FilterSwitcher } from 'pages/supplier-pages/pages/SupplierProducts/Switchers/FilterSwitcher/FilterSwitcher';
import { isLoadingSelector } from 'store/reducers/supplier/product';
import { Search } from 'ui-kit';

export const ProductHeader = (): JSX.Element => {
  const isLoading = useAppSelector(isLoadingSelector);
  const [restFilters, setRestFilters] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.inner_wrapper}>
        <Search
          disabled={isLoading}
          placeholder="Search by Name or SKU"
          className={style.search}
        />
        <FilterSwitcher restFilters={restFilters} setRestFilters={setRestFilters} />
      </div>
      <FilterBlock isOpen={restFilters} />
    </div>
  );
};
