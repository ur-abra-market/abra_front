import { ForGotPasswordResponseType } from './auth.serviceType';
import httpService from './http.service';

export const passwordService = {
  forgotPassword: (email: string) => {
    return httpService.post<ForGotPasswordResponseType>('password/forgot_password/', {
      email,
    });
  },
};
