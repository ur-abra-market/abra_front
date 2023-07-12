import React, { FC } from 'react';

import { FilterItem } from './FilterItem/FilterItem';
import style from './FilterSwitch.module.scss';

import { ArrowDownIcon, ArrowUpIcon } from 'assets/icons';
import { IHeaderSearch } from 'old-components/NewSupplierProductsListPage/HeaderSupplierProductsListPage/HeaderSearch/HeaderSearch';

export const FilterSwitch: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  return (
    <div className={style.wrapper}>
      {!restFilters ? (
        <FilterItem
          text="Show filters"
          Icon={ArrowDownIcon}
          restFilters={restFilters}
          setRestFilters={setRestFilters}
        />
      ) : (
        <FilterItem
          text="Hide filters"
          Icon={ArrowUpIcon}
          restFilters={restFilters}
          setRestFilters={setRestFilters}
        />
      )}
    </div>
  );
};
