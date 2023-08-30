import { ChangeEvent, FC } from 'react';

import style from './Filters.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { setSortBy, setSortField } from 'store/reducers/productSlice';
import { sortBySelector, sortFieldSelector } from 'store/reducers/productSlice/selectors';
import { ISortField } from 'store/reducers/productSlice/types';
import { Checkbox, ISelectOption, Select } from 'ui-kit';

const selectData = [
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

  const handleChangeSortBy = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.currentTarget.checked;

    dispatch(setSortBy(isChecked ? 'asc' : 'desc'));
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
        options={selectData}
        onChange={handleChangeSortField}
        className={style.sort_select}
      />

      <div className={style.switcher_wrapper}>
        <p>ascending</p>
        <Checkbox
          checked={sortBy === 'asc'}
          onChange={handleChangeSortBy}
          variant="notification"
        />
      </div>
    </div>
  );
};
