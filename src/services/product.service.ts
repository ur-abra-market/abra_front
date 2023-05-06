import { Categories } from '../pages/MainPage/MainPage';

import httpService from './http.service';

import { OrderParams } from 'enums/orderParams.enum';
import {
  IGradeProduct,
  IGradeProductRequest,
  IProduct,
  IRequestPopularProduct,
  IRequestProduct,
  IResponse,
} from 'interfaces';

export interface IRequestCategory {
  offset: number;
  limit: number;
  category_id: Categories;
  order_by: OrderParams;
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
    const { data } = await httpService.get(`products/${product_id}/images/`, {});

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
