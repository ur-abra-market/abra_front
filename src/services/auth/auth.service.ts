import baseConfigService from '../baseConfig.service';

import {
  IConfirmEmailRequest,
  IRegisterRequest,
  LogoutResponseType,
  ChangePasswordPayloadType,
  IBusinessInfoRequestData,
  LoginParamsType,
  LoginResponseType,
  PasswordResponseType,
  RegisterResponseType,
  ResetPasswordPayloadType,
  IPersonalInfoRequestData,
  ChangeEmailPayloadType,
} from './auth.serviceTypes';

export const authService = {
  userRole: () => {
    return baseConfigService.get(`/login/role/`);
  },

  register: async ({ email, password, role }: IRegisterRequest) => {
    const { data } = await baseConfigService.post<RegisterResponseType>(
      `register/${role}/`,
      {
        email,
        password,
      },
    );

    return data;
  },

  confirmEmail: async ({ token }: IConfirmEmailRequest) => {
    const { data } = await baseConfigService.get<RegisterResponseType>(
      `register/confirmEmail/?token=${token}`,
    );

    return data;
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

  changeEmail: (params: ChangeEmailPayloadType) => {
    return baseConfigService.patch<PasswordResponseType>('users/changeEmail/', params);
  },
};

export default authService;
