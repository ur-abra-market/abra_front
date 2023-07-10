import { IProductCompilation } from 'services/product/product.serviceTypes';

export interface IProductSliceInitialState {
  productCard: IProductCard;
  similarProducts: IProductCompilation[];
  popularProducts: IProductCompilation[];
  isFavorite: boolean; // времянка пока бэк не отдаёт нам состояние, после удалить
}
export interface IProductCard {
  id: number;
  name: string;
  description: string;
  datetime: string;
  grade_average: number;
  total_orders: number;
  uuid: string;
  is_active: boolean;
  category: ICategory;
  supplier: ISupplier;
  images: IImage[];
  tags: string[];
  prices: IPrice[];
  variations: any[];
}

export interface ICategory {
  id: number;
  name: string;
  level: number;
  parent_id: number;
}

export interface ISupplier {
  id: number;
  license_number: string;
  grade_average: number;
  additional_info: string;
}

export interface IImage {
  id: number;
  image_url: string;
  order: number;
}

export interface IPrice {
  id: number;
  value: number;
  discount: number;
  min_quantity: number;
  start_date: string;
  end_date: string;
}
