import { IProduct } from '../product/product.serviceTypes';
import { ISellerNotifications } from '../seller/seller.serviceTypes';
import {
  ISupplierNotifications,
  ISuppliersUpdateISupplierCompanyInfo,
  ISupplierUpdateCompanyInfo,
} from '../supplier/supplier.serviceTypes';

import { ResponseUserRoleType } from 'common/types';

export interface IRegisterRequest {
  email: string;
  password: string;
  role: ResponseUserRoleType;
}

export interface IConfirmEmailRequest {
  token: string;
}

export interface IRegisterResponse {
  result: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  result: string;
  is_supplier: boolean;
}

export interface IPasswordResponse {
  result: string;
}

export interface IResetPasswordRequest {
  new_password: string;
  confirm_password: string;
  token: string;
}

export interface IChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface IChangeEmailRequest {
  new_email: string;
  confirm_email: string;
}

export interface ILogoutResponse {
  result: boolean;
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
      addresses?: ISellerAddressData[];
    };
  };
  detail: {
    has_profile: boolean;
  };
}

export interface IBusinessInfoRequest
  extends Omit<ISuppliersUpdateISupplierCompanyInfo, 'company_data_request'> {
  company_data_request: ISendISupplierCompanyInfo;
}

interface ISendISupplierCompanyInfo extends ISupplierUpdateCompanyInfo {
  logo_url: string;
}

export interface IPersonalInfoRequest {
  first_name: string;
  last_name: string;
  country_id: number;
  phone_number: string;
}
