import React, { useEffect, useState } from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum, SelectedViewEnum } from 'common/types';
import { ProductsPerPage, SkeletonProductCard } from 'elements';
import { ProductCard } from 'modules';
import { productsPerPageSelector, setProductsPerPage } from 'store/reducers/productSlice';
import {
  favoriteProductsSelector,
  getFavoritesProductsService,
  userLoadingSelector,
} from 'store/reducers/userSlice';
import { ButtonQuestion, Search, Title } from 'ui-kit';
import { Pagination } from 'ui-kit/Pagination/Pagination';

import style from './SellerFavoritesList.module.scss';

const MIN_PRODUCT_PER_PAGE = 20;

export const SellerFavoritesList = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector(favoriteProductsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = useAppSelector(productsPerPageSelector);
  const totalPages = Math.ceil(MIN_PRODUCT_PER_PAGE / productsPerPage);
  const isLoading =
    useAppSelector(userLoadingSelector).favoritesProductsLoading ===
    LoadingStatusEnum.Loading;
  const isMoreThanProductPerPage = favoriteProducts.length >= MIN_PRODUCT_PER_PAGE;

  const handleChangeSelect = (value: number): void => {
    dispatch(setProductsPerPage(value));
  };

  useEffect(() => {
    const param = {
      offset: (currentPage - 1) * productsPerPage,
      limit: productsPerPage,
    };

    dispatch(getFavoritesProductsService(param));
  }, [productsPerPage, currentPage]);

  const productSkeleton = Array.from({ length: productsPerPage }).map((el, i) => (
    <SkeletonProductCard key={i} selectedView={SelectedViewEnum.GRID} />
  ));

  const favoriteProductsView = favoriteProducts.map(product => (
    <ProductCard product={product} key={product.id} isFavorite />
  ));

  const paginationComponent = (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChanged={setCurrentPage}
      disabled={isLoading}
    />
  );

  return (
    <div className={style.favorites_page}>
      <div className={style.container}>
        <div className={style.top}>
          <Title as="h3">Favorites list</Title>
          <Search className={style.search} placeholder="Search within my favorites" />
        </div>
        {isMoreThanProductPerPage && (
          <div className={style.pagination}>{paginationComponent}</div>
        )}
        <div className={style.main}>
          {isLoading ? productSkeleton : favoriteProductsView}
        </div>
        <div className={style.control_panel}>
          {isMoreThanProductPerPage && (
            <ProductsPerPage disabled={isLoading} onChange={handleChangeSelect} />
          )}
          {isMoreThanProductPerPage && paginationComponent}
        </div>
        <div className={style.bottom}>
          <ButtonQuestion />
        </div>
      </div>
    </div>
  );
});
