import httpService from './http.service';

import { IRequestSimilarProduct, I_SimilarProduct, IResponse } from 'interfaces';

export const getSimilarProductsService = {
  get: async (payload: IRequestSimilarProduct) => {
    const { data } = await httpService.get<IResponse<I_SimilarProduct[]>>(
      `products/similar/`,
      {
        params: {
          ...payload,
        },
      },
    );

    return data;
  },
};
