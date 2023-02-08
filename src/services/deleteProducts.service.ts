import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const fetchDeleteProducts = {
  deleteList: async (id: any) => {
    const { data } = await httpService.patch(`suppliers/delete_products/`, [...id], {
      // @ts-ignore
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data.result;
  },
};

export default fetchDeleteProducts;
