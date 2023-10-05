import React, { FC } from 'react';

import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { deleteUrlSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/deleteUrlSearchParams';
import {
  isLoadingSelector,
  resetProductStatusSelection,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

import style from './FilterSwitcher.module.scss';

export interface IHeaderSearch {
  restFilters: boolean;
  setRestFilters: (value: boolean) => void;
}

export const FilterSwitcher: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const text = restFilters ? 'Hide filters' : 'Show filters';

  const handleRestFiltersSet = (): void => {
    setRestFilters(!restFilters);
  };

  const onResetFiltersHandler = (): void => {
    deleteUrlSearchParams(searchParams, setSearchParams);
    dispatch(resetProductStatusSelection());
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
        <ArrowIcon onClick={handleRestFiltersSet} className={iconClasses} />
      </ButtonIcon>

      <ButtonIcon
        disabled={isLoading}
        onClick={onResetFiltersHandler}
        className={style.reset_link}
      >
        Reset Filters
      </ButtonIcon>
    </div>
  );
};
