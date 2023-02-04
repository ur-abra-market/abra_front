import httpService from './http.service';

import { IRequestSimilarProduct, ISimilarProduct, IResponse } from 'interfaces';

export const getSimilarProductsService = {
  get: async (payload: IRequestSimilarProduct) => {
    const { data } = await httpService.get<IResponse<ISimilarProduct[]>>(
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
