interface IProductPriceInfo {
  discount: number;
  end_date: string;
  id: number;
  min_quantity: number;
  start_date: string;
  value: number;
}

export interface IProduct {
  created_at: string;
  description: string;
  grade_average: number;
  id: number;
  is_active: boolean;
  name: string;
  prices: IProductPriceInfo[];
  total_orders: number;
  up_to_discount: number;
  updated_at: string;
}

export interface IProductsListResponse {
  total_count: number;
  products: IProduct[];
}

export interface ISupplierProductSliceInitialState {
  totalCount: number;
  isLoading: boolean;
  products: IProduct[];
  unselectedProductIds: number[];
  selectedProductIds: number[];
  selectAllProducts: boolean;
  hasChanged: boolean;
}

export type SortType = 'date' | 'price' | 'rating' | 'total_orders';

export interface IProductSortOptions {
  page: number;
  offset: number;
  limit: number;
  categoryIds: number[];
  query?: string;
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
  query?: string;
}
