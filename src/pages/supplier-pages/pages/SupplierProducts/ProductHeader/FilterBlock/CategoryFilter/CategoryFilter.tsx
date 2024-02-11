import React, { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { getAllCategories } from 'store/reducers/commonSlice';
import { resetProductStatusSelection } from 'store/reducers/supplier/product';
import { CategoryDropdown, ISelectOption, Title } from 'ui-kit';

import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';

export const CategoryFilter = (): JSX.Element => {
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(isLoadingSelector);
  const categoryIdsQueryParam = searchParams.get(QUERY_PARAMS_KEY.CATEGORY_IDS);
  // const categoryIds = categoryIdsQueryParam || QUERY_PARAMS_VALUE.ALL;
  const categories = useAppSelector(state => state.common.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const onChangeCategory = useCallback(
    (selectOption: ISelectOption) => {
      const { value } = selectOption;

      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.CATEGORY_IDS, value],
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS_FOR_URL.page],
        [QUERY_PARAMS_KEY.LIMIT, DEFAULT_QUERY_PARAMS_FOR_URL.limit],
      ]);

      dispatch(resetProductStatusSelection());
    },
    [updateUrlQueryParams, dispatch],
  );

  // const categorySelect = [
  //   { label: { text: 'All' }, value: 0 },
  //   ...categories.map(el => ({
  //     label: { text: el.name },
  //     value: el.id,
  //   })),
  // ];

  return (
    <div className={style.filter}>
      <Title className={style.filter_name}>Choose categories</Title>
      <CategoryDropdown category={categories} />
    </div>
  );
};
