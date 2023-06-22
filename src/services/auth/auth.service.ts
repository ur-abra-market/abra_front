import { baseConfigService } from '../baseConfig.service';

import {
  ILogoutResponse,
  ICurrentUserInfoResponse,
  IChangePasswordRequest,
  IBusinessInfoRequest,
  ILoginRequest,
  ILoginResponse,
  IPasswordResponse,
  IRegisterRequest,
  IRegisterResponse,
  IResetPasswordRequest,
  IPersonalInfoRequest,
} from './auth.serviceTypes';

export const authService = {
  userRole: () => {
    return baseConfigService.get(`login/role/`);
  },

  register: ({ email, password, route, token }: IRegisterRequest) => {
    const payload = { email, password, token };

    if (route === 'confirmEmail') {
      return baseConfigService.get<IRegisterResponse>(
        `register/confirmEmail/?token=${token}`,
      );
    }

    return baseConfigService.post<IRegisterResponse>(`register/${route}/`, payload);
  },

  sendAccountPersonalInfo: async (params: IPersonalInfoRequest) => {
    const { data } = await baseConfigService.post(`register/account/sendInfo/`, params);

    return data;
  },

  sendAccountBusinessInfo: async (params: IBusinessInfoRequest) => {
    const { data } = await baseConfigService.post(`register/business/sendInfo/`, params);

    return data;
  },

  login: (params: ILoginRequest) => {
    return baseConfigService.post<ILoginResponse>(`login/`, params);
  },

  loginCurrentUser: () => {
    return baseConfigService.get<ICurrentUserInfoResponse>(`login/current/`);
  },

  logout: async () => {
    const { data } = await baseConfigService.delete<ILogoutResponse>(`logout/`);

    return data;
  },

  forgotPassword: (email: string) => {
    return baseConfigService.post<IPasswordResponse>('password/forgot/', {
      email,
    });
  },

  checkToken: (token: string) => {
    return baseConfigService.get<IPasswordResponse>(
      `password/checkToken/?token=${token}`,
    );
  },

  resetPassword: (params: IResetPasswordRequest) => {
    return baseConfigService.post<IPasswordResponse>('password/reset/', params);
  },

  changePassword: (params: IChangePasswordRequest) => {
    return baseConfigService.post<IPasswordResponse>('password/change/', params);
  },
};
