import { useState, useEffect } from 'react';

const DEFAULT_DELAY: number = 850;

export const useDebounce = (value: string, delay: number = DEFAULT_DELAY): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
