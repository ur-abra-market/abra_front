import axios from 'axios';

const baseConfigService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost/',
  withCredentials: true,
});

export default baseConfigService;
