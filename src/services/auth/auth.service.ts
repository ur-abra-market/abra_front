import {
  IConfirmEmailRequest,
  IRegisterRequest,
  IChangePasswordRequest,
  ILoginRequest,
  ILoginResponse,
  IPasswordResponse,
  IResetPasswordRequest,
  IPersonalInfoRequest,
  IChangeEmailRequest,
} from './auth.serviceTypes';

import { baseConfigService } from 'services/baseConfig.service';

export const authService = {
  userRole: () => {
    return baseConfigService.get(`auth/login/role`);
  },

  register: async ({ email, password, role }: IRegisterRequest) => {
    const { data } = await baseConfigService.post<IPasswordResponse>(`register/${role}`, {
      email,
      password,
    });

    return data;
  },

  confirmEmail: async ({ token }: IConfirmEmailRequest) => {
    const { data } = await baseConfigService.get<IPasswordResponse>(
      `register/confirmEmail/?token=${token}`,
    );

    return data;
  },

  sendAccountPersonalInfo: async (params: IPersonalInfoRequest) => {
    const { data } = await baseConfigService.post(`register/account/sendInfo`, params);

    return data;
  },

  login: (params: ILoginRequest) => {
    return baseConfigService.post<ILoginResponse>(`auth/login`, params);
  },

  logout: async () => {
    const { data } = await baseConfigService.delete<IPasswordResponse>(`auth/logout`);

    return data;
  },

  forgotPassword: (email: string) => {
    return baseConfigService.post<IPasswordResponse>(`password/forgot/?email=${email}`);
  },

  checkToken: (token: string) => {
    return baseConfigService.get<IPasswordResponse>(
      `password/checkToken/?token=${token}`,
    );
  },

  resetPassword: (params: IResetPasswordRequest) => {
    const { token, ...restParams } = params;

    return baseConfigService.post<IPasswordResponse>(
      `password/reset/?token=${token}`,
      restParams,
    );
  },

  changePassword: (params: IChangePasswordRequest) => {
    return baseConfigService.post<IPasswordResponse>('password/change', params);
  },

  changeEmail: (params: IChangeEmailRequest) => {
    return baseConfigService.post<IPasswordResponse>('users/changeEmail', params);
  },
};

export default authService;
