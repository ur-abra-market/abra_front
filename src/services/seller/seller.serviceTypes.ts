export interface ISellerData {
  first_name: string;
  last_name: string;
}

export interface ISellerAddressData {
  country: string;
  area: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postal_code: string;
}
export interface PayloadEditAddress {
  id: number;
  params: ISellerAddressData;
}

export interface SellerAddressData {
  phone_country_code: string;
  phone_number: string;
  address_id: number;
  first_name: string;
  last_name: string;
  id: number;
  country: string;
  area: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postal_code: string;
}

export interface EditAddressData {
  id: number;
  data: SellerAddressData;
}
export interface ResponseAddressData {
  ok: boolean;
  result: SellerAddressData[];
}
export interface ResponseDeleteAddress {
  ok: boolean;
  result: boolean;
}

export interface ISellerProfile {
  seller_data: ISellerData;
  seller_address_data: ISellerAddressData;
  seller_notifications_data: any;
}

export interface IGetAddressesResponse {
  result: IGetAddressesResult;
}

export interface IGetAddressesResult {
  seller_address: ISellerAddressData[];
}

export interface ISellerNotifications {
  on_discount: boolean;
  on_order_updates: boolean;
  on_order_reminders: boolean;
  on_stock_again: boolean;
  on_product_is_cheaper: boolean;
  on_your_favorites_new: boolean;
  on_account_support: boolean;
}
