import { SetURLSearchParams } from 'react-router-dom';

import { QUERY_PARAMS_KEY } from './queryParamsConstants';

export const deleteUrlSearchParams = (
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
): void => {
  Object.values(QUERY_PARAMS_KEY).forEach(key => {
    const valueFromSearchParams = searchParams.get(key);

    if (valueFromSearchParams) {
      searchParams.delete(key);
    }
  });

  setSearchParams(searchParams);
};
