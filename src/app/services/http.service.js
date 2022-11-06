import axios from 'axios'
import authService from './auth.service'
import cookieService from './cookie.service'

const httpService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
  // headers: { crossDomain: true },
})

httpService.interceptors.request.use(
  async function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

httpService.interceptors.response.use(
  (res) => {
    return res
  },
  async function (error) {
    const access = cookieService.getAccesToken()
    const refresh = cookieService.getRefreshToken()
    if (refresh && !access && error.response.status === 401)
      await authService.refresh(refresh)

    return Promise.reject(error)
  }
)

export default httpService
