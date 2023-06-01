import axios from 'axios';

import { store } from '../store/createStore';
import { setResponseError } from '../store/reducers/appSlice/slice';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      store.dispatch(setResponseError('Network error or no response received'));
    } else if (error.response.status === 500) {
      store.dispatch(setResponseError('Internal Server Error'));
    } else {
      store.dispatch(setResponseError(error.message || 'Some error occurred'));
    }

    return Promise.reject(error);
  },
);
