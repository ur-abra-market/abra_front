import { ICategory } from 'common/types';
import { ISupplierCompanyInfo } from 'services/supplier/supplier.serviceTypes';

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
  category_id: number;
  offset: number;
  limit: number;
}

export interface ICategoryRequest {
  offset: number;
  limit: number;
  category_id: string;
  ascending: boolean;
  sort?: 'total_orders' | 'date' | 'price' | 'rating';
}

export interface IProductRequest {
  product_id: number;
}

interface IProductImage {
  id?: number;
  image_url?: string;
  order?: number;
}

type ICompany = Omit<ISupplierCompanyInfo, 'country, images, phone'> & {
  logo_url: string;
};

interface IProductSupplier {
  additional_info: string;
  company: ICompany;
  grade_average: number;
  id: number;
  license_number: number;
  user: {
    datetime: string;
    email: string;
    first_name: string;
    full_name: string;
    id: number;
    is_deleted: boolean;
    is_supplier: boolean;
    is_verified: boolean;
    last_name: string;
    phone_number: string;
  };
  total_orders: 0;
  uuid: string;
}

export interface IProductsCompilationResponse {
  products: IProductCompilation[];
  total_count: number;
}

export interface IProductCompilation {
  category: ICategory;
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
  uuid: string;
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
