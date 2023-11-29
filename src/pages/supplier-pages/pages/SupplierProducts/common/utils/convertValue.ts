import { QUERY_PARAMS_KEY, QUERY_PARAMS_VALUE } from './queryParamsConstants';

export const convertValue = (key: string, value: string | null): any => {
  if (value === null) {
    return null;
  }

  switch (key) {
    case QUERY_PARAMS_KEY.PAGE:
    case QUERY_PARAMS_KEY.LIMIT:
      return +value;

    case QUERY_PARAMS_KEY.CATEGORY_IDS:
      return value === QUERY_PARAMS_VALUE.ALL ? [] : value.split('_').map(el => +el);

    case QUERY_PARAMS_KEY.ASCENDING:
      return value === QUERY_PARAMS_VALUE.ASCENDING;

    case QUERY_PARAMS_KEY.SALE:
      return value === QUERY_PARAMS_VALUE.ALL
        ? QUERY_PARAMS_VALUE.ALL
        : String(value === QUERY_PARAMS_VALUE.ON_SALE);

    case QUERY_PARAMS_KEY.STATUS:
      return value === QUERY_PARAMS_VALUE.ALL
        ? QUERY_PARAMS_VALUE.ALL
        : String(value === QUERY_PARAMS_VALUE.ACTIVE);

    default:
      return value;
  }
};
