import httpService from './http.service'
import cookieService from './cookie.service'

const access = cookieService.getAccesToken()

const formRegistration = {
  suppliers: async ({ path, rest }) => {
    const { data } = await httpService.post(
      `suppliers/${path}/`,
      { ...rest },
      { headers: { 'X-CSRF-TOKEN': access } }
    )
    return data
  }
}

export default formRegistration
