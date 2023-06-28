import { ResponseUserRoleType } from 'common/types';

export interface IRegisterRequest {
  email: string;
  password: string;
  role: ResponseUserRoleType;
}

export interface IConfirmEmailRequest {
  token: string;
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

export interface IPersonalInfoRequest {
  first_name: string;
  last_name: string;
  country_id: number;
  phone_number: string;
}
