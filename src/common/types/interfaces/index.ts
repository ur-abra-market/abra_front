export interface IAccountPersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IImageProduct {
  image_url: string;
  serial_number: number;
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
  phone_country_code: string;
  phone_number: string;
}
