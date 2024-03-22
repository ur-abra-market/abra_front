import React, { useCallback } from 'react';

import { useAppDispatch } from 'common/hooks';
import { CategoriesDropdown } from 'elements';
import { ILastSelectedCategory } from 'elements/CategoriesDropdown/CategoriesDropdown';
import { useGetSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useGetSearchParams';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { resetProductStatusSelection } from 'store/reducers/supplier/product';
import { Title } from 'ui-kit';

import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';

export const CategoryFilter = (): JSX.Element => {
  const { updateUrlQueryParams } = useUpdateSearchParams();
  const { categoryIds } = useGetSearchParams();
  const dispatch = useAppDispatch();

  const handleCategoryURLUpdate = useCallback(
    (value: ILastSelectedCategory[]) => {
      const valueIds = value.map(category => category.id);

      if (valueIds.length === categoryIds.length) {
        const isEqualValue = valueIds.every((el, i) => el === categoryIds[i]);

        if (isEqualValue) return;
      }

      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.CATEGORY_IDS, valueIds],
        [QUERY_PARAMS_KEY.PAGE, DEFAULT_QUERY_PARAMS_FOR_URL.page],
        [QUERY_PARAMS_KEY.LIMIT, DEFAULT_QUERY_PARAMS_FOR_URL.limit],
      ]);

      dispatch(resetProductStatusSelection());
    },
    [updateUrlQueryParams, dispatch],
  );

  return (
    <div className={style.filter}>
      <Title className={style.filter_name}>Choose categories</Title>
      <CategoriesDropdown handleCategoryURLUpdate={handleCategoryURLUpdate} />
    </div>
  );
};
