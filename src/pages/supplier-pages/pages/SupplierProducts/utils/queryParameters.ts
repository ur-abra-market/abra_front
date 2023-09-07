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

export const DEFAULT_QUERY_PARAMS = {
  [QUERY_PARAMS_KEY.SORT]: 'date',
  [QUERY_PARAMS_KEY.STATUS]: 'all',
  [QUERY_PARAMS_KEY.SALE]: 'all',
  [QUERY_PARAMS_KEY.ASCENDING]: 'asc',
  [QUERY_PARAMS_KEY.CATEGORY_IDS]: 'all',
  [QUERY_PARAMS_KEY.PAGE]: '1',
  [QUERY_PARAMS_KEY.LIMIT]: '20',
};
