import React, { FC } from 'react';

import { FilterItem } from './FilterItem/FilterItem';
import style from './FilterSwitch.module.scss';

import { IHeaderSearch } from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/HeaderSearch/HeaderSearch';

export const FilterSwitch: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  return (
    <div className={style.wrapper}>
      {!restFilters ? (
        <FilterItem
          text="Show filters"
          restFilters={restFilters}
          setRestFilters={setRestFilters}
        />
      ) : (
        <FilterItem
          text="Hide filters"
          restFilters={restFilters}
          setRestFilters={setRestFilters}
        />
      )}
    </div>
  );
};
