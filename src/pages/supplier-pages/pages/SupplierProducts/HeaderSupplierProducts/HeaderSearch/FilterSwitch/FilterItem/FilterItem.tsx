import React, { FC } from 'react';

import cn from 'classnames';

import style from './FilterItem.module.scss';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { IHeaderSearch } from 'pages/supplier-pages/pages/SupplierProducts/HeaderSupplierProducts/HeaderSearch/HeaderSearch';
import {
  getParamsSelector,
  isLoadingSelector,
  setPage,
  setParams,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

interface ItemProps extends IHeaderSearch {
  text: string;
}

export const FilterItem: FC<ItemProps> = ({
  setRestFilters,
  restFilters,
  text,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const params = useAppSelector(getParamsSelector);

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
    <>
      <button className={style.rest_filters} type="button" onClick={handleRestFiltersSet}>
        {text}
      </button>
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
    </>
  );
};
