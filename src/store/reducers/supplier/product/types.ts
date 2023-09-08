interface IProductPriceInfo {
  discount: number;
  end_date: string;
  id: number;
  min_quantity: number;
  start_date: string;
  value: number;
}

export interface IProduct {
  datetime: string;
  description: string;
  grade_average: number;
  id: number;
  is_active: boolean;
  name: string;
  prices: IProductPriceInfo[];
}

export interface IProductsListResponse {
  total_count: number;
  products: IProduct[];
}

export interface ISupplierProductSliceInitialState {
  totalCount: number;
  isLoading: boolean;
  products: IProduct[];
  deactivatedProductIds: number[];
  activeProductIds: number[];
  selectAllProducts: boolean;
  hasChanged: boolean;
}

export type SortType = 'date' | 'price' | 'rating' | 'total_orders';

export interface IProductSortOptions {
  page: number;
  offset: number;
  limit: number;
  categoryIds: number[];
  sale?: boolean;
  status?: boolean;
  sortField: SortType;
  sortBy: boolean;
}

export interface IProductRequestParams
  extends Omit<
    IProductSortOptions,
    'categoryIds' | 'onSale' | 'isActive' | 'page' | 'sortBy' | 'sortField'
  > {
  category_ids: number[];
  on_sale?: boolean;
  is_active?: boolean;
  sort: SortType;
  ascending: boolean;
}

export interface IProductSorting {
  offset: number;
  limit: number;
  sort: SortType;
  ascending: boolean;
}

export interface IProductFilterParams {
  category_ids: number[];
  on_sale?: boolean;
  is_active?: boolean;
}
