import axios from 'axios';

import { getCookie } from 'common/utils/getCookie';
import { store } from 'store/createStore';
import { setResponseError } from 'store/reducers/appSlice/slice';

export const baseConfigService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost/',
  withCredentials: true,
});

baseConfigService.interceptors.request.use(
  config => {
    if (process.env.REACT_APP_SERVER_URL) {
      const csrfToken = getCookie('csrf_access_token');

      if (csrfToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers = config.headers || {};
        // eslint-disable-next-line no-param-reassign
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

baseConfigService.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 422) {
      store.dispatch(
        setResponseError(
          'The data you submitted is invalid. Please check the input and try again.',
        ),
      );
    } else if (error.response.status === 413) {
      store.dispatch(
        setResponseError(
          'The content too Large. Please reduce the content size and retry.',
        ),
      );
    } else if (error.response.status >= 500) {
      store.dispatch(
        setResponseError(
          'Internal Server Error. Something went wrong on our end. Please try again later.',
        ),
      );
    } else if (error.code === 'ERR_NETWORK') {
      store.dispatch(
        setResponseError(
          'No internet connection. Please check your network and try again.',
        ),
      );
    } else {
      return Promise.reject(error);
    }
  },
);
