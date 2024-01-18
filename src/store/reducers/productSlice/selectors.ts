import {
  IBundleVariationPod,
  IImage,
  IPricesBundle,
  ISortBy,
  ISortField,
  ITag,
} from './types';

import { ICategory, LoadingStatusEnum } from 'common/types';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { RootStateType } from 'store/createStore';

export const productCategorySelector = (state: RootStateType): ICategory =>
  state.product.productCard.category ?? {};

export const favoriteProductSelector = (state: RootStateType): boolean =>
  state.product.productCard.is_favorite;

export const productGradeSelector = (state: RootStateType): number | string =>
  state.product.productCard.grade_average;

export const productTotalOrdersSelector = (state: RootStateType): number | null =>
  state.product.productCard.total_orders;

export const productImagesSelector = (state: RootStateType): IImage[] =>
  state.product.productCard.images;

export const productNameSelector = (state: RootStateType): string =>
  state.product.productCard.name;

export const productTagsSelector = (state: RootStateType): ITag[] =>
  state.product.productCard.tags;

export const productVariationsSelector = (state: RootStateType): IBundleVariationPod[] =>
  state.product.productCard.bundle_variation_pods;

export const productDescriptionSelector = (state: RootStateType): string =>
  state.product.productCard.description;

export const popularProductsSelector = (state: RootStateType): IProductCompilation[] =>
  state.product.popularProducts;

export const similarProductsSelector = (state: RootStateType): IProductCompilation[] =>
  state.product.similarProducts;
export const productsCompilationSelector = (
  state: RootStateType,
): { [key: number]: IProductCompilation[] } => state.product.productsCompilation;

export const loadingProductsSelector = (state: RootStateType): LoadingStatusEnum =>
  state.product.loading;

export const productsPerPageSelector = (state: RootStateType): number =>
  state.product.productsPerPage;

export const productsListSelector = (state: RootStateType): IProductCompilation[] =>
  state.product.productsList;

export const totalProductsCountSelector = (state: RootStateType): number =>
  state.product.totalProductsCount;

export const sortFieldSelector = (state: RootStateType): ISortField =>
  state.product.sortField;

export const sortBySelector = (state: RootStateType): ISortBy => state.product.sortBy;

export const priseSelector = (state: RootStateType): IPricesBundle[] =>
  state.product.selectedBundle.bundle.prices;

export const supplierNameSelector = (state: RootStateType): string =>
  state.product.productCard.supplier.company.name;

export const productBreadCrumbsSelector = (state: RootStateType): ICategory[] =>
  state.product.productCard.breadcrumbs;
