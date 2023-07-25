import {
  IConfirmEmailRequest,
  IRegisterRequest,
  IChangePasswordRequest,
  ILoginRequest,
  ILoginResponse,
  IResetPasswordRequest,
  IPersonalInfoRequest,
  IChangeEmailRequest,
} from './auth.serviceTypes';

import { IBaseResponse, ResponseUserRoleType } from 'common/types';
import { baseConfigService } from 'services/baseConfig.service';

export const authService = {
  userRole: () => {
    return baseConfigService.get<IBaseResponse<ResponseUserRoleType>>(`auth/login/role`);
  },

  register: async ({ email, password, role }: IRegisterRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>(`register/${role}`, {
      email,
      password,
    });
  },

  confirmEmail: async ({ token }: IConfirmEmailRequest) => {
    return baseConfigService.get<IBaseResponse<boolean>>(
      `register/confirmEmail/?token=${token}`,
    );
  },

  sendAccountPersonalInfo: async (params: IPersonalInfoRequest) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `register/account/sendInfo`,
      params,
    );

    return data;
  },

  login: (params: ILoginRequest) => {
    return baseConfigService.post<ILoginResponse>(`auth/login`, params);
  },

  logout: async () => {
    return baseConfigService.delete<IBaseResponse<boolean>>(`auth/logout`);
  },

  forgotPassword: (email: string) => {
    return baseConfigService.post<IBaseResponse<boolean>>(
      `password/forgot/?email=${email}`,
    );
  },

  checkToken: (token: string) => {
    return baseConfigService.get<IBaseResponse<boolean>>(
      `password/checkToken/?token=${token}`,
    );
  },

  resetPassword: (params: IResetPasswordRequest) => {
    const { token, ...restParams } = params;

    return baseConfigService.post<IBaseResponse<boolean>>(
      `password/reset/?token=${token}`,
      restParams,
    );
  },

  changePassword: (params: IChangePasswordRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>('password/change', params);
  },

  changeEmail: (params: IChangeEmailRequest) => {
    return baseConfigService.post<IBaseResponse<boolean>>('users/changeEmail', params);
  },
};
