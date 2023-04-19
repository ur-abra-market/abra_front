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
export type userRoleType = null | 'supplier' | 'seller' | 'admin';
