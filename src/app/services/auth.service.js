import httpService from "./http.service";

const authService = {
  register: async ({ userStatus, ...rest }) => {
    const { data } = await httpService.post(`register/${userStatus}/`, {
      ...rest,
    });
    console.log(data);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpService.post(`login/`, {
      email,
      password,
      withCredentials: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpService.post("login/refresh");
    console.log(data);
    return data;
  },
};

export default authService;
