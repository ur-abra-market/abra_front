import { PasswordResponseType, ResetPasswordPayloadType } from "./auth.serviceType";
import httpService from './http.service';

export const passwordService = {
  forgotPassword: (email: string) => {
    return httpService.post<PasswordResponseType>('password/forgot_password/', {
      email,
    });
  },
  checkToken:(token: string)=>{
    return httpService.post<PasswordResponseType>('password/check_for_token/' + '?token='+token)
  },
  resetPassword:(params:ResetPasswordPayloadType)=>{
    return httpService.patch<PasswordResponseType>('password/reset_password/', params)
  }
};
