import { IProduct } from '../product/product.serviceTypes';
import { IISellerAddressData, ISellerNotifications } from '../seller/seller.serviceTypes';
import { ISupplierNotifications } from '../supplier/supplier.serviceTypes';

export interface IRegisterRequest {
  email?: string;
  password?: string;
  route?: string;
  token?: string;
}
export interface IRegisterResponse {
  result: string;
}

export interface IPersonalInfoRequest {
  first_name: string;
  last_name: string;
  country_id: number;
  phone_number: string;
}

export interface IBusinessInfoRequest {
  supplier_data_request: {
    license_number: string;
  };
  company_data_request: {
    phone_country_code: string;
    phone_number: string;
    name: string;
    is_manufacturer: false;
    year_established: 0;
    number_employees: 0;
    description: string;
    address: string;
    logo_url: string;
    business_sector: string;
    business_email: string;
    country_id: number;
  };
}

export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  result: string;
  is_supplier: boolean;
}

export interface ICurrentUserInfoResponse {
  result: {
    datetime: string;
    updated_at?: string;
    phone_country_code: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    is_verified?: boolean;
    is_deleted?: boolean;
    is_supplier?: boolean;
    supplier?: {
      license_number?: string;
      grade_average?: number;
      additional_info?: string;
      notifications?: ISupplierNotifications;
      products?: IProduct[];
    };
    seller?: {
      has_main_address?: boolean;
      notifications?: ISellerNotifications;
      addresses?: IISellerAddressData[];
    };
  };
  detail: {
    has_profile: boolean;
  };
}

export interface ILogoutResponse {
  result: boolean;
}

export interface IPasswordResponse {
  result: string;
}

export interface IResetPasswordRequest {
  new_password: string;
  confirm_password: string;
}

export interface IChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export type CheckAuthResponseType = {
  result: { is_supplier: boolean };
};
