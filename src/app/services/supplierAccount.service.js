import httpService from "./http.service";

const fetchSupplierAccount = {
  getList: async (user_id) => {
    const { data } = await httpService.get(`suppliers/${user_id}/send-account-info/`);
    console.log(data.resule)
    return data.result;
  },  
};

export default fetchSupplierAccount;