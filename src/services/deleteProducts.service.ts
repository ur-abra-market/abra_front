import httpService from './http.service';

const fetchDeleteProducts = {
  deleteList: async (id: any) => {
    const { data } = await httpService.patch(`suppliers/deleteProducts/`, [...id]);

    return data.result;
  },
};

export default fetchDeleteProducts;
