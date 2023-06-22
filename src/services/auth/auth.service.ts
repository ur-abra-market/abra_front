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

  sendAccountPersonalInfo: async (personalInfoData: IPersonalInfoRequest) => {
    const { data } = await baseConfigService.post(
      `register/account/sendInfo/`,
      personalInfoData,
    );

    return data;
  },

  sendAccountBusinessInfo: async (businessInfoData: IBusinessInfoRequest) => {
    const { data } = await baseConfigService.post(
      `register/business/sendInfo/`,
      businessInfoData,
    );

    return data;
  },

  login: (loginData: ILoginRequest) => {
    return baseConfigService.post<ILoginResponse>(`login/`, loginData);
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

  resetPassword: (resetPasswordData: IResetPasswordRequest) => {
    return baseConfigService.post<IPasswordResponse>(
      'password/reset/',
      resetPasswordData,
    );
  },

  changePassword: (changePasswordData: IChangePasswordRequest) => {
    return baseConfigService.post<IPasswordResponse>(
      'password/change/',
      changePasswordData,
    );
  },
};
