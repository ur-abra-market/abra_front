import { ICountry } from 'services/common/common.serviceTypes';

interface ISellerAddress {
  country_id: number;
  is_main: boolean;
  first_name: string;
  last_name: string;
  area?: string;
  city: string;
  street: string;
  building?: string;
  apartment?: string;
  postal_code: string;
}

interface ISellerAddressPhone {
  country_id: number;
  phone_number: string;
}

export interface ISellerAddressRequest {
  address_id?: number;
  seller_address_request: ISellerAddress;
  seller_address_phone_request: ISellerAddressPhone;
}

export interface IPhone {
  id: number;
  phone_number: string;
  country: ICountry;
}

export interface ISellerAddressData {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  is_main: boolean;
  area: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postal_code: string;
  country: ICountry;
  phone: IPhone;
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
