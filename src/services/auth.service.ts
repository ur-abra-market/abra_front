import httpService from './http.service';
import { RegisterParamsType } from "./auth.serviceType";

const authService = {
  register:  ({email, password, route, token}:RegisterParamsType) => {
    return  httpService.post(`register/${route}`, {email, password, token});
  },

  login: async ({ email, password }: any) => {
    const { data } = await httpService.post(`login/`, {
      email,
      password,
    });

    return data;
  },

  checkAuth: async () => {
    const { data } = await httpService.get(`users/get_role`);

    return data;
  },

  logout: async () => {
    const { data } = await httpService.delete(`logout`);

    return data;
  },
};

export default authService;
