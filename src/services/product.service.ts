import { ProductSortType } from '../common/types/enums/productSortType.enum';
import { Categories } from '../pages/sellerPages/MainPage/MainPage';

import httpService from './http.service';

import {
  IGradeProduct,
  IGradeProductRequest,
  IProduct,
  IRequestPopularProduct,
  IRequestProduct,
  IResponse,
} from 'common/types/interfaces';

export interface IRequestCategory {
  offset: number;
  limit: number;
  category_id: Categories;
  sort_type: ProductSortType;
  ascending: boolean;
}
export const productFetch = {
  getList: async ({
    offset,
    limit,
    category_id,
    sort_type,
    ascending,
  }: IRequestCategory) => {
    const { data } = await httpService.post(
      `products/compilation/?offset=${offset}&limit=${limit}`,
      {
        category_id,
        sort_type,
        ascending,
      },
    );

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
