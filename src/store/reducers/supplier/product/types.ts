import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

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

export interface IProductsListRequest {
  total_count: number;
  products: IProduct[];
}

export interface ISupplierProductSliceInitialState {
  totalCount: number;
  isLoading: boolean;
  products: IProduct[];
  deactivationProductIds: IActivateStatus[];
  activeProductIds: IActivateStatus[];
  selectAllProducts: boolean;
  hasChanged: boolean;
  page: number;
  params: IProductSortOptions;
}

export type SortType = 'date' | 'price' | 'rating' | 'total_orders';

export interface IProductSortOptions {
  offset: number;
  limit: number;
  categoryIds: number[];
  onSale?: boolean;
  isActive?: boolean;
  sort: SortType;
  ascending: boolean;
}

export interface IProductsSortRequest
  extends Omit<IProductSortOptions, 'categoryIds' | 'onSale' | 'isActive'> {
  category_ids: number[];
  on_sale?: boolean;
  is_active?: boolean;
}

export interface IProductPaginationParams {
  offset: number;
  limit: number;
  sort: SortType;
  ascending: boolean;
}

export interface IProductSortParams {
  category_ids: number[];
  on_sale?: boolean;
  is_active?: boolean;
}
