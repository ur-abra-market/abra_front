import axios from "axios";

const httpAuth = axios.create({
  baseURL: "http://wbplt-env.eba-qxbp72mz.eu-central-1.elasticbeanstalk.com/",
});

const authService = {
  register: async ({ email, password, status }) => {
    const { data } = await httpAuth.post(`register/${status}/`, {
      email,
      password,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`login/`, {
      email,
      password,
    });
    return data;
  },
};

export default authService;
