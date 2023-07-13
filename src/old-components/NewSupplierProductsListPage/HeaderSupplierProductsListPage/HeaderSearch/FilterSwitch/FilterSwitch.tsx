import React, { FC } from 'react';

import { FilterItem } from './FilterItem/FilterItem';
import style from './FilterSwitch.module.scss';

import { ArrowIcon } from 'assets/icons';
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
          Icon={ArrowIcon}
          restFilters={restFilters}
          setRestFilters={setRestFilters}
        />
      ) : (
        <FilterItem
          text="Hide filters"
          Icon={ArrowIcon}
          restFilters={restFilters}
          setRestFilters={setRestFilters}
        />
      )}
    </div>
  );
};
