import httpService from './http.service'
import cookieService from './cookie.service'

const access = cookieService.getAccesToken()

const supplierAccountData = {
  getAccountData: async () => {
    const { data } = await httpService.get(`suppliers/get_supplier_info/`, {
      headers: { 'X-CSRF-TOKEN': access }
    })
    return data.result
  },
  postAccountData: async (personalData) => {
    const { data } = await httpService.post(
      `suppliers/send_account_info/`,
      personalData,
      {
        headers: { 'X-CSRF-TOKEN': access }
      }
    )
    return data
  }
}

export default supplierAccountData
