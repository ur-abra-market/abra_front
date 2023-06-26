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

export interface IAddressDataResponse {
  ok: boolean;
  result: ISellerAddressData[];
}
export interface ResponseDeleteAddress {
  ok: boolean;
  result: boolean;
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
