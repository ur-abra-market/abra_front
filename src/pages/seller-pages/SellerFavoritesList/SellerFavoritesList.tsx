import React, { useEffect, useState } from 'react';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum, SelectedViewEnum } from 'common/types';
import { ProductsPerPage, SkeletonProductCard } from 'elements';
import { ProductCard } from 'modules';
import { ICategoryRequest } from 'services/product/product.serviceTypes';
import {
  getProductsListCompilation,
  productsListSelector,
  productsPerPageSelector,
  setProductsPerPage,
  totalProductsCountSelector,
} from 'store/reducers/productSlice';
import { loadingProductsSelector } from 'store/reducers/productSlice/selectors';
import { ButtonQuestion, Search, Title } from 'ui-kit';
import { Pagination } from 'ui-kit/Pagination/Pagination';

import style from './SellerFavoritesList.module.scss';

export const SellerFavoritesList = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  // TODO wait current data
  // const products = useAppSelector(favoriteProductsSelector);
  const products = useAppSelector(productsListSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const loadingSlider = useAppSelector(loadingProductsSelector);
  const productsPerPage = useAppSelector(productsPerPageSelector);
  const totalCount = useAppSelector(totalProductsCountSelector);
  const totalPages = Math.ceil(totalCount / productsPerPage);
  const isLoading = loadingSlider === LoadingStatusEnum.Loading;

  const productsView = products.map(product => (
    <ProductCard key={product.id} product={product} />
  ));
  const handleChangeSelect = (value: number): void => {
    dispatch(setProductsPerPage(value));
  };

  useEffect(() => {
    const param = {
      offset: (currentPage - 1) * productsPerPage,
      limit: productsPerPage,
      category_id: 1,
      sort: 'rating',
      ascending: false,
    } as unknown as ICategoryRequest;

    dispatch(getProductsListCompilation(param));
  }, [productsPerPage, currentPage]);

  const productSkeleton = Array.from({ length: productsPerPage }).map((el, i) => (
    <SkeletonProductCard key={i} selectedView={SelectedViewEnum.GRID} />
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
        <div className={style.pagination}>{paginationComponent}</div>
        <div className={style.main}>{isLoading ? productSkeleton : productsView}</div>
        <div className={style.control_panel}>
          <ProductsPerPage disabled={isLoading} onChange={handleChangeSelect} />
          {paginationComponent}
        </div>
        <div className={style.bottom}>
          <ButtonQuestion />
        </div>
      </div>
    </div>
  );
});
