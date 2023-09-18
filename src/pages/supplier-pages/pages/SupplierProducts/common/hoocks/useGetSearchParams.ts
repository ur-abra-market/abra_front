import { useSearchParams } from 'react-router-dom';

import { ISearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/types/types';
import { convertValue } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/convertValue';
import {
  DEFAULT_QUERY_PARAMS_FOR_REQUEST,
  QUERY_PARAMS_KEY,
} from 'pages/supplier-pages/pages/SupplierProducts/common/utils/queryParamsConstants';

export const useGetSearchParams = (): ISearchParams => {
  const [searchParams] = useSearchParams();
  const result: any = {} as ISearchParams;

  Object.values(QUERY_PARAMS_KEY).forEach((key: keyof ISearchParams) => {
    const valueFromSearchParams = searchParams.get(key);

    result[key] = valueFromSearchParams
      ? convertValue(key, valueFromSearchParams)
      : DEFAULT_QUERY_PARAMS_FOR_REQUEST[key];
  });

  return result;
};
