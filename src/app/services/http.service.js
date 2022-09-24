import axios from "axios";
import cookieService from "./cookie.service";
import authService from "./auth.service";

const httpService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  // headers: { crossDomain: true },
});

httpService.interceptors.request.use(
  async function (config) {
    const refresh = cookieService.getRefreshToken();
    if (refresh) {
      await authService.refresh();
    }
    config.headers = { ...config.headers, csrf_refresh_token: refresh };

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
    }
    return Promise.reject(error);
  }
);

export default httpService;
