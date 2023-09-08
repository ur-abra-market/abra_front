export const QUERY_PARAMS_KEY = {
  SORT: 'sortField',
  STATUS: 'status',
  SALE: 'sale',
  ASCENDING: 'sortBy',
  CATEGORY_IDS: 'categoryIds',
  PAGE: 'page',
  LIMIT: 'limit',
} as const;

export const QUERY_PARAMS_VALUE = {
  DATE: 'date',
  PRICE: 'price',
  RATING: 'rating',
  TOTAL_ORDERS: 'total_orders',
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_SALE: 'on_sale',
  OFF_SALE: 'off_sale',
  ASCENDING: 'asc',
  DESCENDING: 'desc',
} as const;

export const DEFAULT_QUERY_PARAMS_FOR_URL = {
  [QUERY_PARAMS_KEY.SORT]: QUERY_PARAMS_VALUE.DATE,
  [QUERY_PARAMS_KEY.STATUS]: QUERY_PARAMS_VALUE.ALL,
  [QUERY_PARAMS_KEY.SALE]: QUERY_PARAMS_VALUE.ALL,
  [QUERY_PARAMS_KEY.ASCENDING]: QUERY_PARAMS_VALUE.ASCENDING,
  [QUERY_PARAMS_KEY.CATEGORY_IDS]: QUERY_PARAMS_VALUE.ALL,
  [QUERY_PARAMS_KEY.PAGE]: '1',
  [QUERY_PARAMS_KEY.LIMIT]: '20',
} as const;

export const DEFAULT_QUERY_PARAMS_FOR_REQUEST = {
  [QUERY_PARAMS_KEY.SORT]: 'date',
  [QUERY_PARAMS_KEY.STATUS]: undefined,
  [QUERY_PARAMS_KEY.SALE]: undefined,
  [QUERY_PARAMS_KEY.ASCENDING]: true,
  [QUERY_PARAMS_KEY.CATEGORY_IDS]: [],
  [QUERY_PARAMS_KEY.PAGE]: 1,
  [QUERY_PARAMS_KEY.LIMIT]: 20,
} as const;
