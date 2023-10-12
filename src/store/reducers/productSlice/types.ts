import { LoadingStatusEnum } from 'common/types';
import { IProductCompilation } from 'services/product/product.serviceTypes';

export interface IProductSliceInitialState {
  productCard: IProductCard;
  similarProducts: IProductCompilation[];
  popularProducts: IProductCompilation[];
  productsCompilation: { [key: number]: IProductCompilation[] };
  isFavorite: boolean; // времянка пока бэк не отдаёт нам состояние, после удалить
  productsPerPage: number;
  loading: LoadingStatusEnum;
  totalProductsCount: number;
  productsList: IProductCompilation[];
  sortField: ISortField;
  sortBy: ISortBy;
}

export type ISortField = 'rating' | 'price' | 'date' | 'total_orders';
export type ISortBy = 'asc' | 'desc';

export interface IProductCard {
  id: number | null;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  grade_average: number | string;
  total_orders: number | null;
  is_active: boolean;
  category: ICategory;
  supplier: ISupplier;
  images: IImage[];
  tags: ITag[];
  bundle_variation_pods: IBundleVariationPod[];
}

export interface ICategory {
  id: number | null;
  created_at: string;
  updated_at: string;
  name: string;
  level: number | null;
  parent_id: number | null;
}

export interface ISupplier {
  id: number | null;
  created_at: string;
  updated_at: string;
  license_number: string;
  grade_average: number | null;
  additional_info: string;
  user: IUser;
  company: ICompany;
}

export interface IUser {
  first_name: string;
  last_name: string;
  is_verified: boolean;
}

export interface ICompany {
  id: number | null;
  created_at: string;
  updated_at: string;
  business_email: string;
  name: string;
  is_manufacturer: boolean;
  year_established: number | null;
  employees_number_id: number | null;
  description: string;
  address: string;
  logo_url: string;
}

export interface IImage {
  id: number | null;
  created_at: string;
  updated_at: string;
  image_url: string;
  order: number | null;
}

export interface ITag {
  id: number | null;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IBundleVariationPod {
  id: number;
  created_at: string;
  updated_at: string;
  prices: IPrice[];
}

export interface IPrice {
  id: number;
  created_at: string;
  updated_at: string;
  value: number;
  bundle_variation_pod_id: number;
  start_date: string;
  end_date: string;
}

// export interface IProductCard {
//   id: number | null;
//   name: string;
//   description: string;
//   datetime: string;
//   grade_average: number | string;
//   total_orders: number | null;
//   uuid: string;
//   is_active: boolean;
//   category: ICategory;
//   supplier: ISupplier;
//   images: IImage[];
//   tags: string[];
//   prices: IPrice[];
//   variations: any[];
// }
//
// export interface ISupplier {
//   id: number | null;
//   license_number: string;
//   grade_average: number | null;
//   additional_info: string;
// }
//
// export interface IImage {
//   id: number;
//   image_url: string;
//   order: number;
// }
//
// export interface IPrice {
//   id: number;
//   value: number;
//   discount: number;
//   min_quantity: number;
//   start_date: string;
//   end_date: string;
// }
