import httpService from './http.service';

const authService = {
  register: async ({ route, ...rest }: any) => {
    const { data } = await httpService.post(`register/${route}/`, {
      ...rest,
    });

    return data;
  },
  login: async ({ email, password }: any) => {
    const { data } = await httpService.post(`login/`, {
      email,
      password,
    });

    return data;
  },
  refresh: async (refresh: any) => {
    const { data } = await httpService.post(
      'login/refresh',
      {},
      { headers: { 'X-CSRF-TOKEN': refresh } },
    );

    return data;
  },
};

export default authService;
