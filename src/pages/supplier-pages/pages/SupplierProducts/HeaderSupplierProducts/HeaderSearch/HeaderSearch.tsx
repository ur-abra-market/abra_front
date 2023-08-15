import React, { FC } from 'react';

import { FilterSwitch } from './FilterSwitch/FilterSwitch';
import style from './HeaderSearch.module.scss';
import { ViewListFilter } from './ViewListFilter/ViewListFilter';

import { useAppSelector } from 'common/hooks';
import { isLoadingSelector } from 'store/reducers/supplier/product';
import { Search } from 'ui-kit';

export interface IHeaderSearch {
  restFilters: boolean;
  setRestFilters: (value: boolean) => void;
}

export const HeaderSearch: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  const isLoading = useAppSelector(isLoadingSelector);

  return (
    <div className={style.search_and_layout}>
      <Search
        disabled={isLoading}
        placeholder="Search by Name or SKU"
        className={style.search}
      />
      <FilterSwitch restFilters={restFilters} setRestFilters={setRestFilters} />
      <ViewListFilter />
    </div>
  );
};
