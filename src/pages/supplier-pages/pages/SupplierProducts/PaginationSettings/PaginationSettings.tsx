import { FC, useCallback } from 'react';

import style from './PaginationSettings.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductsPerPage } from 'elements';
import { ViewSwitcher } from 'pages/supplier-pages/pages/SupplierProducts/Switchers/ViewSwitcher/ViewSwitcher';
import {
  getParamsSelector,
  isLoadingSelector,
  pageNumber,
  setPage,
  setParams,
  totalCountSelector,
} from 'store/reducers/supplier/product';
import { Pagination } from 'ui-kit/Pagination/Pagination';

interface IPaginationSettings {
  withSwitcher?: boolean;
}
export const PaginationSettings: FC<IPaginationSettings> = ({
  withSwitcher,
}): JSX.Element => {
  const activePage = useAppSelector(pageNumber);
  const dispatch = useAppDispatch();
  const params = useAppSelector(getParamsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const totalItems = useAppSelector(totalCountSelector);
  const totalPage = Math.ceil(totalItems / params.limit);

  const handleSetActivePage = (pageNumber: number): void => {
    dispatch(setPage(pageNumber));
  };

  const onChangeLimit = useCallback(
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
          onChange={onChangeLimit}
        />

        {withSwitcher && <ViewSwitcher />}
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
