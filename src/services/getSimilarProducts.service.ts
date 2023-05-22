import httpService from './http.service';

import {
  IRequestSimilarProduct,
  IProductCompilation,
  IResponse,
} from 'common/types/interfaces';

export const getSimilarProductsService = {
  get: async (payload: IRequestSimilarProduct) => {
    const { data } = await httpService.get<IResponse<IProductCompilation[]>>(
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
