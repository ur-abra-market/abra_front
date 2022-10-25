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
  async function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    const access = cookieService.getAccesToken();
    const refresh = cookieService.getRefreshToken();
    if (refresh && !access && error.response.status === 401) {
      await authService.refresh(refresh);
    }
    if (!expectedErrors) {
    }
    return Promise.reject(error);
  }
);

export default httpService;
