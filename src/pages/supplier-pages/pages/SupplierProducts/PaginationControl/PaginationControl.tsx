import { useCallback } from 'react';

import style from './PaginationControl.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductsPerPage } from 'elements';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import {
  DEFAULT_QUERY_PARAMS,
  QUERY_PARAMS_KEY,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParameters';
import {
  hasPageChanged,
  isLoadingSelector,
  totalCountSelector,
} from 'store/reducers/supplier/product';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const PaginationControl = (): JSX.Element => {
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const totalItems = useAppSelector(totalCountSelector);
  const limitQueryParam = searchParams.get(QUERY_PARAMS_KEY.LIMIT);
  const pageQueryParam = searchParams.get(QUERY_PARAMS_KEY.PAGE);
  const limit = Number(limitQueryParam || DEFAULT_QUERY_PARAMS.limit);
  const page = Number(pageQueryParam || DEFAULT_QUERY_PARAMS.page);
  const totalPage = Math.ceil(totalItems / limit);

  const handleSetActivePage = (pageNumber: number): void => {
    updateUrlQueryParams([[QUERY_PARAMS_KEY.PAGE, pageNumber]]);

    dispatch(hasPageChanged());
  };

  const onChangeLimit = useCallback(
    (limit: number): void => {
      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS.page],
        [QUERY_PARAMS_KEY.LIMIT, limit],
      ]);
    },
    [updateUrlQueryParams],
  );

  const controlledValue = {
    label: { text: limitQueryParam || DEFAULT_QUERY_PARAMS.limit },
    value: limitQueryParam || DEFAULT_QUERY_PARAMS.limit,
  };

  return (
    <div className={style.select_and_pagination_wrapper}>
      <div className={style.inner_block_wrapper}>
        <ProductsPerPage
          disabled={isLoading}
          controlledValue={controlledValue}
          onChange={onChangeLimit}
        />
      </div>

      <Pagination
        disabled={isLoading}
        currentPage={page}
        totalPages={totalPage}
        onPageChanged={handleSetActivePage}
      />
    </div>
  );
};
