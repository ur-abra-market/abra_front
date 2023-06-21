import axios from 'axios';

import { store } from '../store/createStore';
import { setResponseError } from '../store/reducers/appSlice/slice';

const baseConfigService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost/',
  withCredentials: true,
});

export default baseConfigService;

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
    } else if (error.response.status === 500) {
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
