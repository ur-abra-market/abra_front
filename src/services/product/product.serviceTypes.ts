import { ProductSortEnum } from 'common/types';
import { Categories } from 'pages/general-pages/MainPage/MainPage';

interface IGradeDetails {
  grade: number;
  count: number;
}

interface IGrade {
  grade_average: string;
  count: number;
}

export interface IGradeProductResponse {
  grade_average(grade_average: any): number;
  grade: IGrade;
  grade_details: IGradeDetails[];
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
  phone_country_code?: string;
  phone_number: string;
}

export interface IPopularProductRequest {
  product_id: number;
  page_num: number;
  page_size: number;
}

export interface ICategoryRequest {
  offset: number;
  limit: number;
  category_id: Categories;
  ascending: boolean;
}

export interface IProductRequest {
  product_id: number;
}

interface IProductImage {
  id?: number;
  image_url?: string;
  order?: number;
}

interface IProductSupplier {
  additional_info: string;
  grade_average: number;
  id: number;
  license_number: string;
  user: IProductUser;
}

export interface IProductCompilation {
  id: number;
  name: string;
  description: string;
  datetime: string;
  grade_average: number;
  total_orders: number;
  uuid: string;
  is_active: boolean;
  images: IProductImage[];
  prices: IProductPrice[];
  supplier?: IProductSupplier;
}

export interface IProductPrice {
  id: number;
  value: number;
  discount: number;
  min_quantity: number;
  start_date: string;
  end_date: string;
}

interface IPrice {
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

export interface IProductPaginateList {
  page_size: number;
  amountPages: number;
  page_num: number;
  allItems: number;
  sort_type: string;
  category: string;
  price_from: number;
  price_to: number;
  discount: boolean;
  ascending: boolean;
  brands: [];
  materials: [];
  sizes: [];
}
