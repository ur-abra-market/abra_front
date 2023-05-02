import {
  ChangePasswordPayloadType,
  PasswordResponseType,
  ResetPasswordPayloadType,
} from './auth.serviceType';
import httpService from './http.service';

export const passwordService = {
  forgotPassword: (email: string) => {
    return httpService.post<PasswordResponseType>('password/forgot/', {
      email,
    });
  },
  checkToken: (token: string) => {
    return httpService.get<PasswordResponseType>(`password/checkToken/?token=${token}`);
  },
  resetPassword: (params: ResetPasswordPayloadType) => {
    return httpService.post<PasswordResponseType>('password/reset/', params);
  },
  changePassword: (params: ChangePasswordPayloadType) => {
    return httpService.post<PasswordResponseType>('password/change/', params);
  },
};
