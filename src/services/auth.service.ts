import {
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType,
} from './auth.serviceType';
import {
  IAccountPersonalInfoRequest,
  IAccountPersonalInfoResponse,
} from './common.serviceType';
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

  sendAccountPersonalInfo: async ({
    first_name,
    last_name,
    phone_country_code,
    phone_number,
  }: IAccountPersonalInfoRequest) => {
    const { data } = await httpService.post<IAccountPersonalInfoResponse>(
      `/register/account/sendInfo/`,
      {
        first_name,
        last_name,
        phone_country_code,
        phone_number,
      },
    );

    return data;
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
