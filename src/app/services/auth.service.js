import httpService from "./http.service";

const authService = {
  register: async ({ rout, ...rest }) => {
    const { data } = await httpService.post(`register/${rout}/`, {
      ...rest,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpService.post(`login/`, {
      email,
      password,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpService.post("login/refresh");
    return data;
  },
};

export default authService;
