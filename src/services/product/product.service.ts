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
import { IProductsListRequest } from 'store/reducers/supplierProductSlice';

export const productService = {
  getList: async ({ offset, limit, category_id, ascending }: ICategoryRequest) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductCompilation[]>>(
      `products/compilation/?offset=${offset}&limit=${limit}&category_id=${category_id}&ascending=${ascending}`,
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
      `products/addFavorite`,
      {},
      { params },
    );

    return data.result;
  },

  removeFavorite: async (params: IProductRequest) => {
    const { data } = await baseConfigService.delete<IBaseResponse<boolean>>(
      `products/removeFavorite`,
      {
        params,
      },
    );

    return data.result;
  },

  getProductImagesById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get(`products/${product_id}/images`, {});

    return data.result;
  },

  getPopularProduct: async (params: IPopularProductRequest) => {
    const { data } = await baseConfigService.get(`products/popular`, {
      params,
    });

    return data;
  },

  getGradesByProductId: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get<IGradeProductResponse>(
      `products/${product_id}/grades`,
    );

    return data;
  },

  deleteList: async (productsId: number[]) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/deleteProducts`,
      [...productsId],
    );

    return data.result;
  },

  restoreList: async (productsId: number[]) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/restoreProducts`,
      [...productsId],
    );

    return data.result;
  },

  getSimilarProducts: async (params: IPopularProductRequest) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductCompilation[]>>(
      `products/similar`,
      { params },
    );

    return data;
  },

  getListManageProducts: async (offset: number, limit: number) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductsListRequest[]>>(
      `suppliers/products`,
      {
        params: {
          offset,
          limit,
        },
      },
    );

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

    const { data } = await baseConfigService.post('products/pagination', body, {
      params: queryParams,
    });

    return data;
  },
};
