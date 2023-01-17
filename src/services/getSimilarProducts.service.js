import httpService from './http.service';

export const getSimilarProductsService = {
  get: async product_id => {
    const { data } = await httpService.get(`products/similar/`, {
      params: {
        product_id,
      },
    });

    return data;
  },
};
