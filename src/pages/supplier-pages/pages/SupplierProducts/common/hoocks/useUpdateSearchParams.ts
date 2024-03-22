import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

interface IUpdateSearchParams {
  updateUrlQueryParams: (updates: [string, any][]) => void;
  searchParams: URLSearchParams;
}

type QueryParamUpdate = [string, string | undefined | boolean | number];

export const useUpdateSearchParams = (): IUpdateSearchParams => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrlQueryParams = useCallback(
    (updates: QueryParamUpdate[]) => {
      updates.forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            const stringValue = value.join(',');

            searchParams.set(key, String(stringValue));
          } else if (value.length === 0) {
            searchParams.delete(key);
          }
        } else {
          searchParams.set(key, String(value));
        }
      });

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams],
  );

  return { updateUrlQueryParams, searchParams };
};
