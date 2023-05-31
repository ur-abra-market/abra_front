import axios from 'axios';

import { store } from '../store/createStore';
import { setResponseError } from '../store/reducers/appSlice/slice';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response || error.response.status === 500) {
      store.dispatch(setResponseError(error.message || 'Some error'));
    }

    return Promise.reject(error);
  },
);
