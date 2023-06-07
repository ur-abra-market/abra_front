import { Dispatch } from '@reduxjs/toolkit';

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
  email: string;
};

export type ChangePasswordPayloadType = {
  old_password: string;
  new_password: string;
};

export type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export interface IBusinessInfoRequestData {
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
