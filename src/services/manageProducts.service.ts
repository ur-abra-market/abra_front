import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const fetchManageProducts = {
  getList: async () => {
    const { data } = await httpService.post(
      `suppliers/manage_products/`,
      {},
      {
        // @ts-ignore
        headers: { 'X-CSRF-TOKEN': access },
      },
    ); // нужно подгружать только позиции, которые не были удалены

    return data.result;
  },
};

export default fetchManageProducts;
