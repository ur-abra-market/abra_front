import { Categories } from '../pages/MainPage/MainPage';
import { CategoryType } from '../pages/MainPage/StatusProduct/StatusProduct';

import httpService from './http.service';

import {
  IResponse,
  IGradeProduct,
  IGradeProductRequest,
  IProduct,
  IRequestPopularProduct,
  IRequestProduct,
} from 'interfaces';

export interface IRequestCategory {
  type: CategoryType;
  category_id: Categories;
  page_num: number;
  page_size: number;
}
export const productFetch = {
  getList: async (productData: IRequestCategory) => {
    const { data } = await httpService.get(`products/compilation/`, {
      params: productData,
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
