import React, { FC } from 'react';

import { FilterSwitcher } from './FilterSwitcher/FilterSwitcher';
import style from './Switchers.module.scss';
import { ViewSwitcher } from './ViewSwitcher/ViewSwitcher';

export interface IHeaderSearch {
  restFilters: boolean;
  setRestFilters: (value: boolean) => void;
}

export const Switchers: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  return (
    <div className={style.search_and_layout}>
      <FilterSwitcher restFilters={restFilters} setRestFilters={setRestFilters} />
      <ViewSwitcher />
    </div>
  );
};
