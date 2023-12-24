import { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { ProductCardFull } from './ProductCardFull/ProductCardFull';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum, SelectedViewEnum } from 'common/types';
import { PageViewSwitcher, ProductsPerPage, SkeletonProductCard } from 'elements';
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
import { ISortBy, ISortField } from 'store/reducers/productSlice/types';
import { ButtonQuestion } from 'ui-kit';
import { Pagination } from 'ui-kit/Pagination/Pagination';

import style from './ProductList.module.scss';

interface IProductList {
  currentSortField: ISortField;
  currentSortBy: ISortBy;
}

export const ProductList: FC<IProductList> = ({
  currentSortField,
  currentSortBy,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedView, setSelectedView] = useState<SelectedViewEnum>(
    SelectedViewEnum.GRID,
  );
  const loadingSlider = useAppSelector(loadingProductsSelector);
  const productsPerPage = useAppSelector(productsPerPageSelector);
  const totalCount = useAppSelector(totalProductsCountSelector);
  const products = useAppSelector(productsListSelector);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const totalPages = Math.ceil(totalCount / productsPerPage);

  useEffect(() => {
    const param = {
      offset: (currentPage - 1) * productsPerPage,
      limit: productsPerPage,
      category_id: !id ? 1 : id,
      sort: currentSortField,
      ascending: currentSortBy === 'asc',
      query: query || undefined,
    } as ICategoryRequest;

    dispatch(getProductsListCompilation(param));
  }, [productsPerPage, currentPage, id, currentSortField, currentSortBy, query]);
  const handleChangeSelect = (value: number): void => {
    dispatch(setProductsPerPage(value));
  };

  const modsProductsContainer = {
    [style.grid_container]: selectedView === SelectedViewEnum.GRID,
    [style.list_container]: selectedView === SelectedViewEnum.LIST,
  };

  const isLoading = loadingSlider === LoadingStatusEnum.Loading;

  const paginationComponent = (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChanged={setCurrentPage}
      disabled={isLoading}
    />
  );

  const productSkeleton = Array.from({ length: productsPerPage }).map((el, i) => (
    <SkeletonProductCard key={i} selectedView={selectedView} />
  ));

  const productsView = products?.map(product => {
    return selectedView === SelectedViewEnum.LIST ? (
      <ProductCardFull key={product.id} product={product} />
    ) : (
      <ProductCard key={product.id} product={product} />
    );
  });

  return (
    <div className={style.wrapper}>
      <div className={style.control_panel}>
        <div className={style.view_switchers}>
          <PageViewSwitcher
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <div className={style.branch_crumbs}>{`bread > crumb > plug`}</div>
          {/* TODO (fake data) */}
        </div>
        {paginationComponent}
      </div>

      <div className={cn(style.list, modsProductsContainer)}>
        {isLoading ? productSkeleton : productsView}
      </div>
      <div className={style.control_panel}>
        <ProductsPerPage disabled={isLoading} onChange={handleChangeSelect} />
        {paginationComponent}
      </div>
      <ButtonQuestion />
    </div>
  );
};
