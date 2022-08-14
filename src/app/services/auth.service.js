import httpService from "./http.service";


const authService = {
  register: async ({ userStatus, ...rest }) => {
    const { data } = await httpService.post(`register/${userStatus}/`, {
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
};

export default authService;
