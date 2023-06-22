import { baseConfigService } from '../baseConfig.service';

import {
  IGradeProduct,
  IProduct,
  IProductCompilation,
  ICategoryRequest,
  IPopularProductRequest,
  IProductRequest,
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
    const { data } = await baseConfigService.get<IGradeProduct>(
      `products/${product_id}/grades/`,
    );

    return data;
  },

  deleteList: async (id: any) => {
    const { data } = await baseConfigService.patch(`suppliers/deleteProducts/`, [...id]);

    return data.result;
  },

  getSimilarProducts: async (params: IPopularProductRequest) => {
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
    const bottom_price = params.price_from > 0 ? `bottom_price=${params.price_to}&` : '';
    const top_price = params.price_to > 0 ? `top_price=${params.price_to}&` : '';
    const category = params.category !== '' ? `category_id=${params.category}&` : '';

    const url = `products/pagination/?page_num=${params.page_num}&page_size=${params.page_size}&${category}with_discount=${params.discount}&sort_type=${params.sort_type}&${bottom_price}${top_price}ascending=${params.ascending}`;
    const body = {
      sizes: params.sizes,
      brands: params.brands,
      materials: params.materials,
    };
    const { data } = await baseConfigService.post(url, body);

    return data;
  },
};
