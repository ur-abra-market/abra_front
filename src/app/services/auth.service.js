import httpService from "./http.service";


const authService = {
  register: async ({ status, ...rest }) => {
    const { data } = await httpService.post(`register/${status}/`, {
      ...rest,
    });
    console.log(data);
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
