import React, { FC } from 'react';

import style from './FilterItem.module.scss';

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
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const FilterItem: FC<ItemProps> = ({
  setRestFilters,
  restFilters,
  Icon,
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

  const styleIconClass = restFilters ? style.vector_down : style.vector_up;

  return (
    <>
      <button className={style.rest_filters} type="button" onClick={handleRestFiltersSet}>
        {text}
      </button>
      <Icon onClick={handleRestFiltersSet} className={styleIconClass} />
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
