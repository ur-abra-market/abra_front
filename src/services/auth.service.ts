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
