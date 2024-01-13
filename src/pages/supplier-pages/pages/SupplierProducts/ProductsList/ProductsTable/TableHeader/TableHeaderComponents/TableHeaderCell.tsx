import { FC } from 'react';

import { CheckboxHeaderCell } from './CheckboxHeaderCell';

import { ArrowSort } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { useUpdateSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useUpdateSearchParams';
import { IColumns } from 'pages/supplier-pages/pages/SupplierProducts/common/types/types';
import {
  DEFAULT_QUERY_PARAMS_FOR_URL,
  QUERY_PARAMS_KEY,
  QUERY_PARAMS_VALUE,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';
import { isLoadingSelector, SortType } from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

interface ITableHeaderCell {
  column: IColumns;
  className: string;
}

export const TableHeaderCell: FC<ITableHeaderCell> = ({ column, className }) => {
  const { updateUrlQueryParams, searchParams } = useUpdateSearchParams();
  const isLoading = useAppSelector(isLoadingSelector);
  const ascendingQueryParam = searchParams.get(QUERY_PARAMS_KEY.ASCENDING);
  const sortQueryParam = searchParams.get(QUERY_PARAMS_KEY.SORT);
  const ascending = ascendingQueryParam || DEFAULT_QUERY_PARAMS_FOR_URL.sortBy;
  const sort = sortQueryParam || DEFAULT_QUERY_PARAMS_FOR_URL.sortField;

  const onChangeSortData = (sortValue?: SortType): void => {
    if (sortValue === sort) {
      const newAscendingValue =
        ascending === QUERY_PARAMS_VALUE.ASCENDING
          ? QUERY_PARAMS_VALUE.DESCENDING
          : QUERY_PARAMS_VALUE.ASCENDING;

      updateUrlQueryParams([[QUERY_PARAMS_KEY.ASCENDING, newAscendingValue]]);
    } else {
      updateUrlQueryParams([
        [QUERY_PARAMS_KEY.ASCENDING, QUERY_PARAMS_VALUE.ASCENDING],
        [QUERY_PARAMS_KEY.SORT, sortValue],
      ]);
    }
  };

  if (column.name === 'Checkbox') {
    return <CheckboxHeaderCell className={className} />;
  }

  return (
    <th key={column.id} className={className} data-column={column.name}>
      {column.name}
      {column.arrow && (
        <ButtonIcon
          disabled={isLoading}
          onClick={() => onChangeSortData(column.sortValue)}
        >
          <ArrowSort />
        </ButtonIcon>
      )}
    </th>
  );
};
