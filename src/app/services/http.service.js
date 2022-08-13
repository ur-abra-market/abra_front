import axios from "axios";
import cookieService from "./cookie.service";
import authService from "./auth.service";

const httpService = axios.create({
  // baseURL: "https://wbplt-env.eba-qxbp72mz.eu-central-1.elasticbeanstalk.com/",
  baseURL: "http://localhost:8000",
  withCredentials: true,
  // headers: { crossDomain: true },
});

httpService.interceptors.request.use(
  async function (config) {
    const refresh = cookieService.getCookie();
    if (refresh) {
      const data = await authService.refresh();
      console.log(data);
    }
    config.headers = { ...config.headers, csrf_refresh_token: refresh };
    console.log(config);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default httpService;
