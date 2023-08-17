import {
  ICategoryRequest,
  IGradeProductResponse,
  IPopularProductRequest,
  IProductCompilation,
  IProductPaginateList,
  IProductRequest,
  IProductsCompilationResponse,
} from './product.serviceTypes';

import { IBaseResponse } from 'common/types/interfaces/IBaseResponse';
import { baseConfigService } from 'services/baseConfig.service';
import { IProductCard } from 'store/reducers/productSlice';
import { IProductsListRequest } from 'store/reducers/supplier/product';
import {
  IProductPaginationParams,
  IProductSortParams,
} from 'store/reducers/supplier/product/types';

export const productService = {
  getList: async (params: ICategoryRequest) => {
    const { data } = await baseConfigService.post<
      IBaseResponse<IProductsCompilationResponse>
    >(`products/compilation`, params);

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

  deleteProducts: async (selectedProductIds: number[]) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/deleteProducts`,
      [...selectedProductIds],
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

  getListSupplierProducts: async (
    body: IProductSortParams,
    params: IProductPaginationParams,
  ) => {
    const { data } = await baseConfigService.post<IBaseResponse<IProductsListRequest>>(
      `suppliers/products`,
      body,
      { params },
    );

    return data.result;
  },

  getProductPaginateList: async (params: IProductPaginateList) => {
    const body = {
      colors: ['string'],
      sizes: ['string'],
      materials: ['string'],
      age_groups: ['string'],
      genders: ['string'],
      technics: ['string'],
      bottom_price: params.price_from > 0 ? params.price_to : 0,
      top_price: params.price_to > 0 ? params.price_to : 0,
      with_discount: false,
      category_id: 1,
      sort_type: params.sort_type,
      ascending: params.ascending,
      // sizes: params.sizes,
      // brands: params.brands,
      // materials: params.materials,
    };
    const queryParams = {
      offset: 0,
      limit: 20,

      // page_num: params.page_num,
      // page_size: params.page_size,
      // category: params.category !== '' ? params.category : '',
      // with_discount: params.discount,
      // sort_type: params.sort_type,
      // bottom_price: params.price_from > 0 ? params.price_to : '',
      // top_price: params.price_to > 0 ? params.price_to : '',
      // ascending: params.ascending,
    };

    const { data } = await baseConfigService.post('products/pagination', body, {
      params: queryParams,
    });

    return data;
  },
};
