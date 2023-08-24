import { ICategory, LoadingStatusEnum } from 'common/types';
import { IProductCompilation } from 'services/product/product.serviceTypes';

export interface IProductSliceInitialState {
  productCard: IProductCard;
  similarProducts: IProductCompilation[];
  popularProducts: IProductCompilation[];
  productsCompilation: { [key: number]: IProductCompilation[] };
  isFavorite: boolean; // времянка пока бэк не отдаёт нам состояние, после удалить
  productsPerPage: number;
  loading: LoadingStatusEnum;
}

export interface IProductCard {
  id: number | null;
  name: string;
  description: string;
  datetime: string;
  grade_average: number | string;
  total_orders: number | null;
  uuid: string;
  is_active: boolean;
  category: ICategory;
  supplier: ISupplier;
  images: IImage[];
  tags: string[];
  prices: IPrice[];
  variations: any[];
}

export interface ISupplier {
  id: number | null;
  license_number: string;
  grade_average: number | null;
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
