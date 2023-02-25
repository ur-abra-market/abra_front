import httpService from "./http.service";
import { ForGotPasswordResponseType } from "./auth.serviceType";

export const passwordService = {
  forgotPassword: (email: string) => {
    return httpService.post<ForGotPasswordResponseType>("password/forgot_password/", { email } );
  }
};