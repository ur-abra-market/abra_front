import baseConfigService from '../baseConfig.service';

import {
  LogoutResponseType,
  CurrentUserInfoResponseType,
  ChangePasswordPayloadType,
  IBusinessInfoRequestData,
  LoginParamsType,
  LoginResponseType,
  PasswordResponseType,
  RegisterParamsType,
  RegisterResponseType,
  ResetPasswordPayloadType,
  IPersonalInfoRequestData,
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
    return baseConfigService.get<CurrentUserInfoResponseType>(`/login/current/`); // todo добавить типизацию
  },

  logout: async () => {
    const { data } = await baseConfigService.delete<LogoutResponseType>(`logout/`);

    return data;
  },

  forgotPassword: (email: string) => {
    return baseConfigService.post<PasswordResponseType>(
      `password/forgot/?email=${email}`,
    );
  },

  checkToken: (token: string) => {
    return baseConfigService.get<PasswordResponseType>(
      `password/checkToken/?token=${token}`,
    );
  },

  resetPassword: (params: ResetPasswordPayloadType) => {
    const { token, ...restParams } = params;

    return baseConfigService.post<PasswordResponseType>(
      `password/reset/?token=${token}`,
      restParams,
    );
  },

  changePassword: (params: ChangePasswordPayloadType) => {
    return baseConfigService.post<PasswordResponseType>('password/change/', params);
  },
};

export default authService;
