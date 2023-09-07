import React, { FC } from 'react';

import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import style from './FilterSwitcher.module.scss';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { DEFAULT_QUERY_PARAMS } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParameters';
import { isLoadingSelector, resetProductStatus } from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

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
    setSearchParams(DEFAULT_QUERY_PARAMS);
    dispatch(resetProductStatus());
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
