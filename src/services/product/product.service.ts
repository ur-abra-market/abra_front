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
  getList: async (getListData: ICategoryRequest) => {
    const { offset, limit, category_id, sort_type, ascending } = getListData;
    const payload = { category_id, sort_type, ascending };

    const { data } = await baseConfigService.post(
      `products/compilation/?offset=${offset}&limit=${limit}`,
      payload,
    );

    return data.result;
  },

  getProductById: async (ProductByIdData: IProductRequest) => {
    const { data } = await baseConfigService.post<IResponse<IProduct>>(
      `products/product_card_p1/`,
      {},
      { params: ProductByIdData },
    );

    return data.result;
  },

  getProductImagesById: async ({ product_id }: IProductRequest) => {
    const { data } = await baseConfigService.get(`products/${product_id}/images/`, {});

    return data.result;
  },

  getPopularProductById: async (popularProductData: IPopularProductRequest) => {
    const { data } = await baseConfigService.get(`products/popular/`, {
      params: popularProductData,
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

  getSimilarProducts: async (similarProductData: IPopularProductRequest) => {
    const { data } = await baseConfigService.get<IResponse<IProductCompilation[]>>(
      `products/similar/`,
      { params: similarProductData },
    );

    return data;
  },

  getListManageProducts: async () => {
    const { data } = await baseConfigService.get(`suppliers/manageProducts/`); // нужно подгружать только позиции, которые не были удалены

    return data.result;
  },

  getProductPaginateList: async (props: IProductPaginateList) => {
    const bottom_price = props.price_from > 0 ? `bottom_price=${props.price_to}&` : '';
    const top_price = props.price_to > 0 ? `top_price=${props.price_to}&` : '';
    const category = props.category !== '' ? `category_id=${props.category}&` : '';

    const url = `products/pagination/?page_num=${props.page_num}&page_size=${props.page_size}&${category}with_discount=${props.discount}&sort_type=${props.sort_type}&${bottom_price}${top_price}ascending=${props.ascending}`;
    const body = {
      sizes: props.sizes,
      brands: props.brands,
      materials: props.materials,
    };
    const { data } = await baseConfigService.post(url, body);

    return data;
  },
};
