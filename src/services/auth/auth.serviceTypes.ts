import {
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
