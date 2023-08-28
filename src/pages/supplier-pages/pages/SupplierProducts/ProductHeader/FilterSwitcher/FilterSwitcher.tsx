import React, { FC } from 'react';

import cn from 'classnames';

import style from './FilterSwitcher.module.scss';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { isLoadingSelector, resetFilters } from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

export interface IHeaderSearch {
  restFilters: boolean;
  setRestFilters: (value: boolean) => void;
}

export const FilterSwitcher: FC<IHeaderSearch> = ({
  restFilters,
  setRestFilters,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const text = restFilters ? 'Hide filters' : 'Show Filters';

  const handleRestFiltersSet = (): void => {
    setRestFilters(!restFilters);
  };

  const onResetFiltersHandler = (): void => {
    dispatch(resetFilters());
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
