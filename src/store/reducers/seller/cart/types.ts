import { ICategory } from 'common/types';
import { IImage, IPrice, ISupplier } from 'store/reducers/productSlice';

export interface IProductCardCart {
  amount: number;
  bundle_variation_pods: any[];
  category: ICategory;
  created_at: string;
  description: string;
  grade_average: number | string;
  id: number | null;
  images: IImage[];
  is_active: boolean;
  name: string;
  prices: IPrice[];
  product_variations: any[];
  supplier: ISupplier;
  tags: any[];
  total_orders: number | null;
  up_to_discount: number | null;
  updated_at: string;
}

export interface ISellersCartResponse {
  created_at: string;
  details: any[];
  id: number;
  is_cart: boolean;
  updated_at: string;
}
