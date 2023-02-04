import httpService from './http.service';

import {
  IResponse,
  IGradeProduct,
  IGradeProductRequest,
  IProduct,
  IRequestPopularProduct,
  IRequestProduct,
} from 'interfaces';

export const productFetch = {
  getList: async (productData: any) => {
    const { data } = await httpService.get(`products/compilation/`, {
      params: {
        type: productData.type,
        category_id: productData.category_id || 0,
      },
    });

    return data.result;
  },

  getProductById: async ({ product_id }: IRequestProduct) => {
    const { data } = await httpService.post<IResponse<IProduct>>(
      `products/product_card_p1/`,
      {},
      {
        params: {
          product_id,
        },
      },
    );

    return data.result;
  },

  getProductImagesById: async ({ product_id }: IRequestProduct) => {
    const { data } = await httpService.get(`products/images/`, {
      params: {
        product_id,
      },
    });

    return data.result;
  },

  getPopularProductById: async (payload: IRequestPopularProduct) => {
    const { data } = await httpService.get(`products/popular/`, {
      params: {
        ...payload,
      },
    });

    return data;
  },

  getGradesByProductId: async ({ product_id }: IGradeProductRequest) => {
    const { data } = await httpService.get<IGradeProduct>(
      `products/${product_id}/grades/`,
    );

    return data;
  },
};

// export default productFetch
