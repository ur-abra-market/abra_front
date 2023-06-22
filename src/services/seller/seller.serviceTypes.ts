export interface ISellerAddressData {
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

interface IErrorDetail {
  loc: [string, number];
  msg: string;
  type: string;
}

export interface ISellerData {
  first_name: string;
  last_name: string;
}

export interface IISellerAddressData {
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
  params: IISellerAddressData;
}

export interface EditAddressData {
  id: number;
  data: ISellerAddressData;
}

export interface IErrorResponse {
  detail: IErrorDetail[];
}

export interface ISellerProfile {
  seller_data: ISellerData;
  seller_address_data: IISellerAddressData;
  seller_notifications_data: any;
}

export interface ISendSellerResponse {
  detail: IErrorDetail[] | string;
}

// get addresses

export interface IGetAddressesResponse {
  result: IGetAddressesResult;
}

export interface IGetAddressesResult {
  seller_address: IISellerAddressData[];
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
