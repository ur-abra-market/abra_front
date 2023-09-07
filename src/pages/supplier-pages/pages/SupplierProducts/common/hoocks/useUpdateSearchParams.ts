import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

interface IUpdateSearchParams {
  updateUrlQueryParams: (updates: [string, any][]) => void;
  searchParams: URLSearchParams;
}

export const useUpdateSearchParams = (): IUpdateSearchParams => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrlQueryParams = useCallback(
    (updates: [string, string | undefined | boolean | number][]) => {
      updates.forEach(([key, value]) => {
        searchParams.set(key, String(value));
      });

      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams],
  );

  return { updateUrlQueryParams, searchParams };
};
