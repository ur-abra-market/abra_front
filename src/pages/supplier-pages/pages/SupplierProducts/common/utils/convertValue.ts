import { QUERY_PARAMS_KEY, QUERY_PARAMS_VALUE } from './queryParamsConstants';

export const convertValue = (key: string, value: string | null): any => {
  if (value === null) {
    return null;
  }

  if (key === QUERY_PARAMS_KEY.PAGE || key === QUERY_PARAMS_KEY.LIMIT) {
    return +value;
  }

  if (key === QUERY_PARAMS_KEY.CATEGORY_IDS) {
    return value === QUERY_PARAMS_VALUE.ALL ? [] : value.split('_').map(el => +el);
  }

  if (key === QUERY_PARAMS_KEY.ASCENDING) {
    return value === QUERY_PARAMS_VALUE.ASCENDING;
  }

  if (key === QUERY_PARAMS_KEY.SALE) {
    return value === QUERY_PARAMS_VALUE.ALL
      ? undefined
      : value === QUERY_PARAMS_VALUE.ON_SALE;
  }

  if (key === QUERY_PARAMS_KEY.STATUS) {
    return value === QUERY_PARAMS_VALUE.ALL
      ? undefined
      : value === QUERY_PARAMS_VALUE.ACTIVE;
  }

  return value;
};
