import { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import { ProductCardFull } from './ProductCardFull/ProductCardFull';

import { Filter } from 'assets/icons';
import { useAppDispatch, useAppSelector, useMediaQuery } from 'common/hooks';
import { LoadingStatusEnum, SelectedViewEnum } from 'common/types';
import { PageViewSwitcher, ProductsPerPage, SkeletonProductCard } from 'elements';
import { ProductCard } from 'modules';
import { PRODUCTS_LIST } from 'routes';
import { ICategoryRequest } from 'services/product/product.serviceTypes';
import {
  getProductsListCompilation,
  productsListSelector,
  productsPerPageSelector,
  setProductsPerPage,
  totalProductsCountSelector,
} from 'store/reducers/productSlice';
import { loadingProductsSelector } from 'store/reducers/productSlice/selectors';
import { getBreadCrumbs } from 'store/reducers/productSlice/thunks';
import { ISortBy, ISortField } from 'store/reducers/productSlice/types';
import { ButtonQuestion } from 'ui-kit';
import { Pagination } from 'ui-kit/Pagination/Pagination';

import style from './ProductList.module.scss';

interface IProductList {
  currentSortField: ISortField;
  currentSortBy: ISortBy;
  closeModal: (value: boolean) => void;
  showModal: boolean;
}

const DESIRED_BREAKPOINT = 430;

export const ProductList: FC<IProductList> = ({
  currentSortField,
  currentSortBy,
  showModal,
  closeModal,
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
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get('category_id');
  const searchValue = useAppSelector(state => state.search.searchValues.mainSearch);
  const query = searchParams.get('query');
  const totalPages = Math.ceil(totalCount / productsPerPage);
  const { isDevice } = useMediaQuery(DESIRED_BREAKPOINT);
  const [breadCrumbs, setBreadCrumbs] = useState<{ value: string; id: number }[]>([]);

  useEffect(() => {
    const param = {
      offset: (currentPage - 1) * productsPerPage,
      limit: productsPerPage,
      category_id: category_id || 1,
      sort: currentSortField,
      ascending: currentSortBy === 'asc',
      query: query || searchValue,
    } as ICategoryRequest;

    dispatch(getProductsListCompilation(param));
    dispatch(getBreadCrumbs({ category_id })).then(data => {
      const breadCrumbsData = data.payload.data.map(
        (el: { name: string; id: number }) => {
          return { value: el.name, id: el.id };
        },
      );

      setBreadCrumbs(breadCrumbsData);
    });
  }, [productsPerPage, currentPage, category_id, currentSortField, currentSortBy, query]);
  const handleChangeSelect = (value: number): void => {
    dispatch(setProductsPerPage(value));
  };

  const modsProductsContainer = {
    [style.grid_container]: selectedView === SelectedViewEnum.GRID || isDevice,
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
    if (selectedView === SelectedViewEnum.LIST) {
      if (!isDevice) {
        return <ProductCardFull key={product.id} product={product} />;
      }

      return <ProductCard key={product.id} product={product} />;
    }

    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <div className={style.wrapper}>
      <div className={style.control_panel}>
        <div className={style.view_switchers}>
          <PageViewSwitcher
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <div className={style.branch_crumbs}>
            {breadCrumbs.map((el, index) => {
              return (
                <NavLink to={`${PRODUCTS_LIST}?category_id=${el.id}`} key={index}>
                  <span className={style.link}>{el.value}</span>
                  {index < breadCrumbs.length - 1 && ' > '}
                </NavLink>
              );
            })}
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => closeModal(true)}
            onKeyDown={() => closeModal(true)}
            className={style.filter}
          >
            <Filter className={showModal ? style.filter_icon : undefined} />
          </div>
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
