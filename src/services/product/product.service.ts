import {
  ICategoryRequest,
  IGradeProductResponse,
  IPopularProductRequest,
  IProductCompilation,
  IProductPaginateList,
  IProductRequest,
} from './product.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';
import { baseConfigService } from 'services/baseConfig.service';
import { IProductCard } from 'store/reducers/productSlice';
import { IProductsListRequest } from 'store/reducers/productSlice/types';

export const productService = {
  getList: async (params: ICategoryRequest) => {
    const { offset, limit, category_id, sort_type, ascending } = params;
    const payload = { category_id, sort_type, ascending };

    const { data } = await baseConfigService.post(
      `products/compilation/?offset=${offset}&limit=${limit}`,
      payload,
    );

    return data.result;
  },

  getProductById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductCard>>(
      `products/productCard/${product_id}`,
    );

    return data.result;
  },

  addFavorite: async (params: IProductRequest) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `products/addFavorite/`,
      {},
      { params },
    );

    return data.result;
  },

  removeFavorite: async (params: IProductRequest) => {
    const { data } = await baseConfigService.delete<IBaseResponse<boolean>>(
      `products/removeFavorite/`,
      {
        params,
      },
    );

    return data.result;
  },

  getProductImagesById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get(`products/${product_id}/images/`, {});

    return data.result;
  },

  getPopularProduct: async (params: IPopularProductRequest) => {
    const { data } = await baseConfigService.get(`products/popular/`, {
      params,
    });

    return data;
  },

  getGradesByProductId: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get<IGradeProductResponse>(
      `products/${product_id}/grades/`,
    );

    return data;
  },

  deleteList: async (id: string[]) => {
    const { data } = await baseConfigService.post(`suppliers/deleteProducts/`, [...id]);

    return data.result;
  },

  getSimilarProducts: async (params: IPopularProductRequest) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductCompilation[]>>(
      `products/similar/`,
      { params },
    );

    return data;
  },

  getListManageProducts: async () => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductsListRequest[]>>(
      `suppliers/manageProducts/`,
    ); // нужно подгружать только позиции, которые не были удалены

    return data.result;
  },

  getProductPaginateList: async (params: IProductPaginateList) => {
    const body = {
      sizes: params.sizes,
      brands: params.brands,
      materials: params.materials,
    };
    const queryParams = {
      page_num: params.page_num,
      page_size: params.page_size,
      category: params.category !== '' ? params.category : '',
      with_discount: params.discount,
      sort_type: params.sort_type,
      bottom_price: params.price_from > 0 ? params.price_to : '',
      top_price: params.price_to > 0 ? params.price_to : '',
      ascending: params.ascending,
    };

    const { data } = await baseConfigService.post('products/pagination/', body, {
      params: queryParams,
    });

    return data;
  },
};
