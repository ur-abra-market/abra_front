import { IActivateStatus } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

interface IProductPriceInfo {
  discount: number;
  end_date: string;
  id: number;
  min_quantity: number;
  start_date: string;
  value: number;
}

export interface IProductsListRequest {
  datetime: string;
  description: string;
  grade_average: number;
  id: number;
  is_active: boolean;
  name: string;
  prices: IProductPriceInfo[];
}

export interface ISupplierProductSliceInitialState {
  products: IProductsListRequest[];
  deactivationProductIds: IActivateStatus[];
  activationProductIds: IActivateStatus[];
  selectAllProducts: boolean;
  hasChanged: boolean;
  page: number;
  params: IProductSortOptions;
}

export type SortType = 'date' | 'price' | 'rating';

export interface IProductSortOptions {
  offset: number;
  limit: number;
  categoryId: number;
  onSale: boolean;
  isActive: boolean;
  sort: SortType;
  ascending: boolean;
}

export interface IProductsSortRequest
  extends Omit<IProductSortOptions, 'categoryId' | 'onSale' | 'isActive'> {
  category_id: number;
  on_sale: boolean;
  is_active: boolean;
}
