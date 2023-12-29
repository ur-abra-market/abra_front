import { IProductCard, ISupplier } from 'store/reducers/productSlice';

export interface IProductCardCart {
  amount: number;
  bundle_variation_pod: IBundleVariationPod;
  bundle_variation_pod_id: number | null;
  created_at: string;
  id: number | null;
  order_id: number | null;
  updated_at: string;
  is_checked: boolean; /// / не приходит с бэка
}

export interface IBundleVariationPod {
  bundle_variations: IBundleVariations[];
  created_at: string;
  id: number | null;
  prices: IPriceBundle[];
  product: IProductInCart;
  updated_at: string;
}

export interface IBundleVariations {
  bundle: IBundle;
  bundle_id: number | null;
  bundle_variation_pod_id: number | null;
  created_at: string;
  id: number | null;
  updated_at: string;
  variation_value_to_product_id: number | null;
  product_variation: IProductVariation;
}

export interface IProductVariation {
  created_at: string;
  id: number | null;
  prices: IPriceBundle[];
  product_id: number | null;
  updated_at: string;
  variation: IVariation;
  variation_value_id: number | null;
}

export interface IVariation {
  created_at: string;
  id: number | null;
  image_url?: string;
  type: ITypeVariation;
  updated_at: string;
  value: string;
  variation_type_id: number | null;
}

export interface ITypeVariation {
  id: number | null;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IBundle {
  created_at: string;
  id: number | null;
  updated_at: string;
  variation_values: IVariationValues[];
}

export interface IVariationValues {
  amount: number;
  bundle_id: number | null;
  created_at: string;
  id: number | null;
  updated_at: string;
  variation_value_to_product_id: number | null;
}

export interface IPriceBundle {
  bundle_variation_pod_id: number | null;
  created_at: string;
  end_date: string;
  id: number | null;
  start_date: string;
  updated_at: string;
  value: number;
}

export interface ISellersCartResponse {
  created_at: string;
  details: any[];
  id: number | null;
  is_cart: boolean;
  updated_at: string;
}

export interface ISupplierInformation {
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

export interface ISupplierData extends ISupplier {
  company: ISupplierInformation;
}

export interface IProductInCart extends IProductCard {
  supplier: ISupplierData;
}
