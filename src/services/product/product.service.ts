import { baseConfigService } from '../baseConfig.service';

import {
  IGradeProductResponse,
  IProduct,
  IProductCompilation,
  ICategoryRequest,
  IPopularProductRequest,
  IProductRequest,
  ISimilarProductRequest,
  IResponse,
  IProductPaginateList,
} from './product.serviceTypes';

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

  getProductById: async (params: IProductRequest) => {
    const { data } = await baseConfigService.post<IResponse<IProduct>>(
      `products/product_card_p1/`,
      {},
      { params },
    );

    return data.result;
  },

  getProductImagesById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get(`products/${product_id}/images/`, {});

    return data.result;
  },

  getPopularProductById: async (params: IPopularProductRequest) => {
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
    const { data } = await baseConfigService.patch(`suppliers/deleteProducts/`, [...id]);

    return data.result;
  },

  getSimilarProducts: async (params: ISimilarProductRequest) => {
    const { data } = await baseConfigService.get<IResponse<IProductCompilation[]>>(
      `products/similar/`,
      { params },
    );

    return data;
  },

  getListManageProducts: async () => {
    const { data } = await baseConfigService.get(`suppliers/manageProducts/`); // нужно подгружать только позиции, которые не были удалены

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
