import httpService from './http.service';

const fetchManageProducts = {
  getList: async () => {
    const { data } = await httpService.post(`suppliers/manage_products/`); // нужно подгружать только позиции, которые не были удалены

    return data.result;
  },
};

export default fetchManageProducts;
