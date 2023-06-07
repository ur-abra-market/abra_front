import { IPersonalInfoRequestData } from '../../common/types';
import baseConfigService from '../baseConfig.service';

import {
  ChangePasswordPayloadType,
  IBusinessInfoRequestData,
  LoginParamsType,
  LoginResponseType,
  PasswordResponseType,
  RegisterParamsType,
  RegisterResponseType,
  ResetPasswordPayloadType,
} from './auth.serviceTypes';

export const authService = {
  userRole: () => {
    return baseConfigService.get(`/login/role/`);
  },

  register: ({ email, password, route, token }: RegisterParamsType) => {
    if (route === 'confirmEmail') {
      return baseConfigService.get<RegisterResponseType>(
        `register/confirmEmail/?token=${token}`,
      );
    }

    return baseConfigService.post<RegisterResponseType>(`register/${route}/`, {
      email,
      password,
      token,
    });
  },

  sendAccountPersonalInfo: async (personalInfoData: IPersonalInfoRequestData) => {
    const { data } = await baseConfigService.post(
      `/register/account/sendInfo/`,
      personalInfoData,
    );

    return data;
  },

  sendAccountBusinessInfo: async (businessInfoData: IBusinessInfoRequestData) => {
    const { data } = await baseConfigService.post(
      `/register/business/sendInfo/`,
      businessInfoData,
    );

    return data;
  },

  login: ({ email, password }: LoginParamsType) => {
    return baseConfigService.post<LoginResponseType>(`login/`, { email, password });
  },

  loginCurrentUser: () => {
    return baseConfigService.get(`/login/current/`); // todo добавить типизацию
  },

  logout: async () => {
    const { data } = await baseConfigService.delete(`logout/`);

    return data;
  },

  forgotPassword: (email: string) => {
    return baseConfigService.post<PasswordResponseType>('password/forgot/', {
      email,
    });
  },

  checkToken: (token: string) => {
    return baseConfigService.get<PasswordResponseType>(
      `password/checkToken/?token=${token}`,
    );
  },

  resetPassword: (params: ResetPasswordPayloadType) => {
    return baseConfigService.post<PasswordResponseType>('password/reset/', params);
  },

  changePassword: (params: ChangePasswordPayloadType) => {
    return baseConfigService.post<PasswordResponseType>('password/change/', params);
  },
};

export default authService;
