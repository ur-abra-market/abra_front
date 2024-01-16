import { LoadingStatusEnum } from 'common/types';
import { IProductCompilation } from 'services/product/product.serviceTypes';

export interface IProductSliceInitialState {
  productCard: IProductCard;
  feedbacks: IFeedbacks;
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
  activeBundle: IActiveBundle;
}

export type ISortField = 'rating' | 'price' | 'date' | 'total_orders';
export type ISortBy = 'asc' | 'desc';

export interface IProductCard {
  breadcrumbs: ICategory[];
  id: number | null;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  grade_average: number | string;
  total_orders: number | null;
  is_active: boolean;
  is_favorite: boolean;
  category: ICategory;
  supplier: ISupplier;
  images: IImage[];
  tags: ITag[];
  bundle_variation_pods: IBundleVariationPod[];
  bundles: IProductBundle[];
}

export interface IProductBundle {
  id: number;
  created_at: string;
  updated_at: string;
  prices: IPricesBundle[];
  product: string;
  variation_values: IVariationValue[];
  pickable_variations: IPickableVariation[];
}

export interface IPricesBundle {
  id: number;
  created_at: string;
  updated_at: string;
  bundle_id: number;
  price: number;
  discount: number;
  start_date: string;
  end_date: string;
  min_quantity: number;
  bundle: string;
}

export interface IVariationValue {
  id: number;
  created_at: string;
  updated_at: string;
  variation_value_to_product_id: number;
  bundle_id: number;
  amount: number;
  bundle: string;
  product_variation: IProductVariation;
}

export interface IPickableVariation {
  id: number;
  created_at: string;
  updated_at: string;
  variation_value_id: number;
  product_id: number;
  variation: IBundlePickableVariation;
  product: string;
  prices: IPickableVariationPrice[];
}

export interface IBundlePickableVariation {
  id: number;
  created_at: string;
  updated_at: string;
  value: string;
  variation_type_id: number;
  image_url?: string;
  type: IBundleType;
  variation: number;
}

export interface IProductVariation {
  id: number;
  created_at: string;
  updated_at: string;
  variation_value_id: number;
  product_id: number;
  variation: IVariation;
  product: string;
  prices: IProductVariationPrice[];
}

export interface IVariation {
  id: number;
  created_at: string;
  updated_at: string;
  type: IBundleType;
  value: string;
  variation_type_id: number;
  image_url?: string;
  variation?: number;
}

export interface IProductVariationPrice {
  id: number;
  created_at: string;
  updated_at: string;
  variation_value_to_product_id: number;
  value: number;
  multiplier: number;
  discount: number;
  start_date: string;
  end_date: string;
  min_quantity: number;
  product_variation_value: string;
}

export interface IBundleType {
  created_at: string;
  id: number;
  name: 'Color' | 'Size-Women-Universal' | 'Size-Men-Universal' | 'Size-Kids-Universal';
  updated_at: string;
}

export interface IPickableVariationPrice {
  id: number;
  created_at: string;
  updated_at: string;
  variation_value_to_product_id: number;
  value: number;
  multiplier: number;
  discount: number;
  start_date: string;
  end_date: string;
  min_quantity: number;
  product_variation_value: string;
}

export interface IActiveBundle {
  type: 'color' | 'size';
  bundle: IProductBundle;
}

export interface IFeedbacks {
  [key: number]: number;
}

export interface IResponseGetProductCardId {
  product: IProductCard;
  feedbacks: IFeedbacks;
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

export interface IFavorite {
  product_id: number;
}
