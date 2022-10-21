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
  refresh: async (refresh) => {
    const { data } = await httpService.post(
      "login/refresh",
      {},
      { headers: { "X-CSRF-TOKEN": refresh } }
    );
    return data;
  },
};

export default authService;
