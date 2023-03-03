import axios from 'axios';

const httpService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost/',
  withCredentials: true,
});

export default httpService;
