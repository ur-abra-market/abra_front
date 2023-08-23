import React, { FC } from 'react';

import cn from 'classnames';

import style from './FilterSwitcher.module.scss';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { IHeaderSearch } from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/Switchers/Switchers';
import {
  getParamsSelector,
  isLoadingSelector,
  setPage,
  setParams,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

export const FilterSwitcher: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const params = useAppSelector(getParamsSelector);
  const text = restFilters ? 'Hide filters' : 'Show Filters';

  const handleRestFiltersSet = (): void => {
    setRestFilters(!restFilters);
  };

  const onResetFiltersHandler = (): void => {
    dispatch(
      setParams({
        ...params,
        limit: 20,
        categoryIds: [],
        ascending: false,
        sort: 'date',
        isActive: undefined,
        onSale: undefined,
      }),
    );
    dispatch(setPage(1));
  };

  const iconClasses = cn({
    [style.vector_down]: restFilters,
    [style.vector_up]: !restFilters,
  });

  return (
    <div className={style.wrapper}>
      <ButtonIcon
        className={style.rest_filters}
        type="button"
        onClick={handleRestFiltersSet}
      >
        {text}
      </ButtonIcon>
      <ArrowIcon onClick={handleRestFiltersSet} className={iconClasses} />

      {restFilters && (
        <ButtonIcon
          disabled={isLoading}
          onClick={onResetFiltersHandler}
          className={style.reset_link}
        >
          Reset Filters
        </ButtonIcon>
      )}
    </div>
  );
};
