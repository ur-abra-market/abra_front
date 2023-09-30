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
import { IProductsListResponse } from 'store/reducers/supplier/product';
import {
  IProductSorting,
  IProductFilterParams,
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
    >(`products`, { category_ids: categoryIds }, { params }); // TODO dont have price, uuid, datetime in response body

    return data.result;
  },

  getProductById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductCard>>( // TODO have a new params in response body (bundle_variation_pods)
      `products/productCard/${product_id}`,
    );

    return data.result;
  },

  addFavorite: async (params: IProductRequest) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `products/addFavorite`, // TODO dont have params
      {},
      { params },
    );

    return data.result;
  },

  removeFavorite: async (params: IProductRequest) => {
    const { data } = await baseConfigService.delete<IBaseResponse<boolean>>(
      `sellers/favorites/remove`,
      {
        params,
      },
    );

    return data.result;
  },

  getProductImagesById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get(`products/${product_id}/images`, {}); // TODO have a new params in response body (created, updated)

    return data.result;
  },

  getPopularProduct: async (params: IPopularProductRequest) => {
    const { data } = await baseConfigService.get(`products/popular`, {
      params,
    }); // TODO what data goes into the category_id

    return data;
  },

  getGradesByProductId: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get<IGradeProductResponse>(
      `products/${product_id}/reviews/grades`,
    );

    return data;
  },

  deleteProducts: async (selectedProductIds: number[]) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/products/delete`,
      [...selectedProductIds],
    );

    return data.result;
  },

  restoreList: async (productsId: number[]) => {
    const { data } = await baseConfigService.post<IBaseResponse<boolean>>(
      `suppliers/products/restore`,
      [...productsId],
    );

    return data.result;
  },

  getSimilarProducts: async (params: IPopularProductRequest) => {
    const { data } = await baseConfigService.get<IBaseResponse<IProductCompilation[]>>(
      `products/similar`, // TODO what data goes into the category_id
      { params },
    );

    return data;
  },

  getListSupplierProducts: async (
    body: IProductFilterParams,
    params: IProductSorting,
  ) => {
    const { data } = await baseConfigService.post<IBaseResponse<IProductsListResponse>>(
      `suppliers/products`,
      body,
      { params },
    );

    return data.result;
  },
};
