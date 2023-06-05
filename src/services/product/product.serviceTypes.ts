import { Categories } from '../../pages/commonPages/MainPage/MainPage';

import { ProductSortType } from 'common/types';

export interface IResponse<T> {
  result: T;
}

export interface GradeDetail {
  grade: number;
  count: number;
}

export interface IGrade {
  grade_average: string;
  count: number;
}

export interface IGradeProduct {
  grade_average(grade_average: any): number;
  grade: IGrade;
  grade_details: GradeDetail[];
}

export interface IProductUser {
  datetime: string;
  email: string;
  first_name: string;
  full_name: string;
  id: number;
  is_deleted: boolean;
  is_supplier: boolean;
  is_verified: boolean;
  last_name: string;
  phone_country_code: string;
  phone_number: string;
}

export interface IRequestPopularProduct {
  product_id: number;
  page_num: number;
  page_size: number;
}

export interface IRequestCategory {
  offset: number;
  limit: number;
  category_id: Categories;
  sort_type: ProductSortType;
  ascending: boolean;
}

export interface IRequestSimilarProduct extends IRequestPopularProduct {}

export interface IRequestProduct {
  product_id: number;
}

export interface IProductImage {
  id?: number;
  image_url?: string;
  order?: number;
  product?: string;
}

export interface IProductSupplier {
  additional_info: string;
  grade_average: number;
  id: number;
  license_number: string;
  user: IProductUser;
}

export interface IProductCompilation {
  datetime: string;
  description: string;
  grade_average: number;
  id: number;
  images: IProductImage[];
  is_active: boolean;
  name: string;
  prices: IProductPrice[];
  supplier?: IProductSupplier;
  total_orders: number;
  uuid?: string;
}

export interface IProductPrice {
  discount: number;
  end_date: string;
  id: number;
  min_quantity: number;
  start_date: string;
  value?: number;
}

export interface IGradeProductRequest extends IRequestProduct {}
export interface IImageProductRequest extends IRequestProduct {}

export interface IPrice {
  value: string;
  min_quantity: number;
  discount: string;
  start_date: string;
  end_date: string;
}

export interface IProduct {
  grade: IGrade;
  category_id: number;
  category_path: string;
  product_name: string;
  is_favorite: boolean;
  tags: string[];
  colors: any[];
  sizes: any[];
  monthly_actual_demand: number;
  daily_actual_demand: number;
  prices: IPrice[];
  supplier_info?: any;
}
