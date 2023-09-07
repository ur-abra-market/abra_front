import { useSearchParams } from 'react-router-dom';

import { convertValue } from './convertValue';
import { QUERY_PARAMS_KEY } from './queryParameters';
import { ISearchParams } from './types';

const defaultRequestParams: ISearchParams = {
  sortField: 'date',
  status: undefined,
  sale: undefined,
  sortBy: true,
  categoryIds: [],
  page: 1,
  limit: 20,
};

export const useGetSearchParams = (): ISearchParams => {
  const [searchParams] = useSearchParams();
  const result = {} as ISearchParams;

  Object.values(QUERY_PARAMS_KEY).forEach(key => {
    const valueFromSearchParams = searchParams.get(key);

    if (valueFromSearchParams) {
      // @ts-ignore
      result[key] = convertValue(key, valueFromSearchParams);
    } else {
      // @ts-ignore
      result[key] = defaultRequestParams[key];
    }
  });

  return result;
};
