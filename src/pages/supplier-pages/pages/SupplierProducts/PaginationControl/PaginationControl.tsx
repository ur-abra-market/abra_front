import { useCallback } from 'react';

import style from './PaginationControl.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductsPerPage } from 'elements';
import {
  paramsSelector,
  isLoadingSelector,
  pageNumberSelector,
  setPage,
  setParams,
  totalCountSelector,
} from 'store/reducers/supplier/product';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const PaginationControl = (): JSX.Element => {
  const activePage = useAppSelector(pageNumberSelector);
  const dispatch = useAppDispatch();
  const params = useAppSelector(paramsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const totalItems = useAppSelector(totalCountSelector);
  const totalPage = Math.ceil(totalItems / params.limit);

  const handleSetActivePage = (pageNumber: number): void => {
    dispatch(setPage(pageNumber));
  };

  const handleChangeLimit = useCallback(
    (limit: number): void => {
      dispatch(setParams({ ...params, limit }));
      dispatch(setPage(1));
    },
    [dispatch, params],
  );

  const controlledValue = {
    label: { text: String(params.limit) },
    value: params.limit,
  };

  return (
    <div className={style.select_and_pagination_wrapper}>
      <div className={style.inner_block_wrapper}>
        <ProductsPerPage
          disabled={isLoading}
          controlledValue={controlledValue}
          onChange={handleChangeLimit}
        />
      </div>

      <Pagination
        disabled={isLoading}
        currentPage={activePage}
        totalPages={totalPage}
        onPageChanged={handleSetActivePage}
      />
    </div>
  );
};
