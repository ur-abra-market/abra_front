import httpService from "./http.service";
import {
  CheckAuthResponseType,
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType
} from "./auth.serviceType";

const authService = {
  register: ({ email, password, route, token }: RegisterParamsType) => {
    return httpService.post<RegisterResponseType>(`register/${route}`, { email, password, token });
  },

  login: ({ email, password }: LoginParamsType) => {
    return httpService.post<LoginResponseType>(`login/`, { email, password });
  },

  checkAuth: () => {
    return  httpService.get<CheckAuthResponseType>(`users/get_role`);
    },

  logout: async () => {
    const { data } = await httpService.delete(`logout`);

    return data;
  }
};

export default authService;