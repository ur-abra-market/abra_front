import {
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType,
} from './auth.serviceType';
import httpService from './http.service';

const authService = {
  register: ({ email, password, route, token }: RegisterParamsType) => {
    if (route === 'confirmEmail') {
      return httpService.get<RegisterResponseType>(
        `register/confirmEmail/?token=${token}`,
      );
    }

    return httpService.post<RegisterResponseType>(`register/${route}/`, {
      email,
      password,
      token,
    });
  },

  login: ({ email, password }: LoginParamsType) => {
    return httpService.post<LoginResponseType>(`login/`, { email, password });
  },

  loginCurrentUser: () => {
    return httpService.get(`/login/current/`); // todo добавить типизацию
  },

  logout: async () => {
    const { data } = await httpService.delete(`logout/`);

    return data;
  },
};

export default authService;
