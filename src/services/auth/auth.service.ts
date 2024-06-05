import {
  IConfirmEmailRequest,
  IRegisterRequest,
  IChangePasswordRequest,
  ILoginRequest,
  ILoginResponse,
  IResetPasswordRequest,
  IPersonalInfoRequest,
  IChangeEmailRequest,
  IRegisterGoogleRequest,
  ILoginGoogleRequest,
} from './auth.serviceTypes';

import { IBaseResponse, ResponseUserRoleType } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';

export const authService = {
  userRole: () => {
    return baseConfigService.get<IBaseResponse<ResponseUserRoleType>>(
      `auth/sign-in/role`,
    );
  },

  register: async ({ email, password, role }: IRegisterRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>(`auth/sign-up/${role}`, {
      email,
      password,
    });
  },

  confirmEmail: async ({ token }: IConfirmEmailRequest) => {
    return baseConfigService.get<IBaseResponse<boolean>>(
      `auth/sign-up/confirmEmail?token=${token}`,
    );
  },

  sendAccountPersonalInfo: async (params: IPersonalInfoRequest) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `auth/sign-up/account/sendInfo`,
      params,
    );

    return data;
  },

  login: (params: ILoginRequest) => {
    return baseConfigService.post<ILoginResponse>(`auth/sign-in`, params);
  },

  logout: async () => {
    const { data } = await baseConfigService.delete<IBaseResponse<boolean>>(
      `auth/sign-out`,
    );

    return data.result;
  },

  forgotPassword: (email: string) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      `users/password/forgot?email=${email}`,
    );
  },

  checkToken: (token: string) => {
    return baseConfigService.get<IBaseResponse<boolean>>(
      `users/password/checkToken?token=${token}`,
    );
  },

  resetPassword: (params: IResetPasswordRequest) => {
    const { token, ...restParams } = params;

    return baseConfigService.post<IBaseResponse<boolean>>(
      `users/password/reset?token=${token}`,
      restParams,
    );
  },

  changePassword: (params: IChangePasswordRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      'users/password/change',
      params,
    );
  },

  changeEmail: (params: IChangeEmailRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      'users/account/changeEmail',
      params,
    );
  },

  googleRegister: ({ role, token }: IRegisterGoogleRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      `auth/sign-up/google/${role}?token=${token}`,
    );
  },

  googleLogin: ({ token }: ILoginGoogleRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      `/auth/sign-in/googleAuth/?token=${token}`,
    );
  },
};
