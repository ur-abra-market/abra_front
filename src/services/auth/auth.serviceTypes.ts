import { AppDispatchType, RootStateType } from '../../store/createStore';
import { IProduct } from '../product/product.serviceTypes';
import { ISellerAddressData } from '../seller/seller.serviceTypes';
import { INotification } from '../supplier/supplier.serviceTypes';

export type RegisterParamsType = {
  email?: string;
  password?: string;
  route?: string;
  token?: string;
};

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
      notifications?: INotification;
      products?: IProduct[];
    };
    seller?: {
      has_main_address?: boolean;
      notifications?: INotification;
      addresses?: ISellerAddressData[];
    };
  };
  detail: {
    has_profile: boolean;
  };
};

export type AsyncThunkConfig = {
  state: RootStateType;
  dispatch: AppDispatchType;
  extra?: unknown;
  rejectValue: string;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};
