import httpService from './http.service';

const fetchManageProducts = {
  getList: async () => {
    const { data } = await httpService.get(`suppliers/manage_products`);
    console.log(data.result);
    return data.result;
  },
};

export default fetchManageProducts;
