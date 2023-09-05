import {
  ICategoryRequest,
  IGradeProductResponse,
  IPopularProductRequest,
  IProductCompilation,
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
  getList: async ({ ascending, category_id, limit, offset, sort }: ICategoryRequest) => {
    const params = { offset, limit, sort, ascending };
    const categoryIds = [];

    if (category_id !== 'all') {
      categoryIds.push(+category_id);
    }

    const { data } = await baseConfigService.post<
      IBaseResponse<IProductsCompilationResponse>
    >(`products/compilation`, { category_ids: categoryIds }, { params });

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
};
