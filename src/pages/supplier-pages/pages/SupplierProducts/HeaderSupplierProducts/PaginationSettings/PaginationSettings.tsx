import { useCallback } from 'react';

import style from './PaginationSettings.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductsPerPage } from 'elements';
import {
  getParamsSelector,
  isLoadingSelector,
  pageNumber,
  setPage,
  setParams,
} from 'store/reducers/supplier/product';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const PaginationSettings = (): JSX.Element => {
  const activePage = useAppSelector(pageNumber);
  const dispatch = useAppDispatch();
  const params = useAppSelector(getParamsSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  const handleSetActivePage = (pageNumber: number): void => {
    dispatch(setPage(pageNumber));
  };

  const onChangeLimit = useCallback(
    (limit: number): void => {
      dispatch(setParams({ ...params, limit }));
    },
    [dispatch, params],
  );

  const controlledValue = {
    label: { text: String(params.limit) },
    value: params.limit,
  };

  return (
    <div className={style.select_and_pagination_wrapper}>
      <ProductsPerPage
        disabled={isLoading}
        controlledValue={controlledValue}
        onChange={onChangeLimit}
      />
      <Pagination
        disabled={isLoading}
        currentPage={activePage}
        totalPages={10}
        onPageChanged={handleSetActivePage}
      />
    </div>
  );
};
