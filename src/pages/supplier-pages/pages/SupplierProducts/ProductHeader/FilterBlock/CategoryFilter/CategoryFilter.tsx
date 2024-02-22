import React, { useCallback } from 'react';

import { useAppDispatch } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import { QUERY_PARAMS_KEY } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { resetProductStatusSelection } from 'store/reducers/supplier/product';
import { CategoryDropdown, Title } from 'ui-kit';
import { ILastSelectedCategory } from 'ui-kit/CategoryDropdown/CategoryDropdown';

import style from 'pages/supplier-pages/pages/SupplierProducts/ProductHeader/FilterBlock/FilterBlock.module.scss';

export const CategoryFilter = (): JSX.Element => {
  const { updateUrlQueryParams } = useUpdateSearchParams();
  const dispatch = useAppDispatch();

  const handleCategoryURLUpdate = useCallback(
    (value: ILastSelectedCategory[]) => {
      if (value.length > 0) {
        const categoryIds = value.map(category => category.id).join(',');

        updateUrlQueryParams([[QUERY_PARAMS_KEY.CATEGORY_IDS, categoryIds]]);
      }

      dispatch(resetProductStatusSelection());
    },
    [updateUrlQueryParams, dispatch],
  );

  return (
    <div className={style.filter}>
      <Title className={style.filter_name}>Choose categories</Title>
      <CategoryDropdown handleCategoryURLUpdate={handleCategoryURLUpdate} />
    </div>
  );
};
