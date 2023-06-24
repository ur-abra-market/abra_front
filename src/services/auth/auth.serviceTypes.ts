import { IProduct } from '../product/product.serviceTypes';
import { ISellerAddressData, ISellerNotifications } from '../seller/seller.serviceTypes';
import {
  ISupplierNotifications,
  ISuppliersUpdateCompanyInfo,
  IUpdateCompanyInfo,
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

export type RegisterResponseType = {
  result: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  result: string;
  is_supplier: boolean;
};

export type CheckAuthResponseType = {
  result: { is_supplier: boolean };
};

export type PasswordResponseType = {
  result: string;
};

export type ResetPasswordPayloadType = {
  new_password: string;
  confirm_password: string;
  token: string;
};

export type ChangePasswordPayloadType = {
  old_password: string;
  new_password: string;
};

export type ChangeEmailPayloadType = {
  new_email: string;
  confirm_email: string;
};

export type LogoutResponseType = {
  result: boolean;
};

export type CurrentUserInfoResponseType = {
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
};

export interface IBusinessInfoRequestData
  extends Omit<ISuppliersUpdateCompanyInfo, 'company_data_request'> {
  company_data_request: ISendCompanyInfo;
}

interface ISendCompanyInfo extends IUpdateCompanyInfo {
  logo_url: string;
}

export interface IPersonalInfoRequestData {
  first_name: string;
  last_name: string;
  country_id: number;
  phone_number: string;
}
