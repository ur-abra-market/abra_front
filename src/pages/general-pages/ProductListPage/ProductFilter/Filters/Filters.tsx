import { FC } from 'react';

import style from './Filters.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { setSortBy, setSortField } from 'store/reducers/productSlice';
import { sortBySelector, sortFieldSelector } from 'store/reducers/productSlice/selectors';
import { ISortBy, ISortField } from 'store/reducers/productSlice/types';
import { ISelectOption, Select } from 'ui-kit';

const selectSortFieldData = [
  {
    label: { text: 'Sort By Rating' },
    value: 'rating',
  },
  {
    label: { text: 'Sort By Price' },
    value: 'price',
  },
  {
    label: { text: 'Sort By Date' },
    value: 'date',
  },
  {
    label: { text: 'Sort By Orders' },
    value: 'total_orders',
  },
];

const selectSortByData = [
  {
    label: { text: 'By Ascending' },
    value: 'asc',
  },
  {
    label: { text: 'By Descending' },
    value: 'desc',
  },
];

interface IFilters {
  onResetAllFilters: () => void;
}

export const Filters: FC<IFilters> = ({ onResetAllFilters }): JSX.Element => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(sortBySelector);
  const sortField = useAppSelector(sortFieldSelector);

  const handleChangeSortField = (data: ISelectOption): void => {
    dispatch(setSortField(data.value as ISortField));
  };

  const handleChangeSortBy = (data: ISelectOption): void => {
    dispatch(setSortBy(data.value as ISortBy));
  };

  return (
    <div className={style.filters}>
      <div className={style.wrapper}>
        <p className={style.title}>Filters</p>
        <button type="button" onClick={onResetAllFilters} className={style.button_reset}>
          Reset All
        </button>
      </div>

      <Select
        defaultValue={sortField}
        options={selectSortFieldData}
        onChange={handleChangeSortField}
        className={style.sort_select}
      />

      <Select
        defaultValue={sortBy}
        options={selectSortByData}
        onChange={handleChangeSortBy}
        className={style.sort_select}
      />
    </div>
  );
};
