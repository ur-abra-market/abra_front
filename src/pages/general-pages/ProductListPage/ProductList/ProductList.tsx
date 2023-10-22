import { FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { PageViewSwitcher, ProductsPerPage, Skeleton } from 'elements';
import { ViewType } from 'elements/PageViewSwitcher/PageViewSwitcher';
import { ProductCard, ProductCardFull } from 'modules';
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
  const [selectedView, setSelectedView] = useState<ViewType>('grid');
  const loadingSlider = useAppSelector(loadingProductsSelector);
  const productsPerPage = useAppSelector(productsPerPageSelector);
  const totalCount = useAppSelector(totalProductsCountSelector);
  const products = useAppSelector(productsListSelector);
  const { id } = useParams();
  const totalPages = Math.ceil(totalCount / productsPerPage);

  useEffect(() => {
    const param = {
      offset: (currentPage - 1) * productsPerPage,
      limit: productsPerPage,
      category_id: id,
      sort: currentSortField,
      ascending: currentSortBy === 'asc',
    } as ICategoryRequest;

    dispatch(getProductsListCompilation(param));
  }, [productsPerPage, currentPage, id, currentSortField, currentSortBy]);

  const handleChangeSelect = (value: number): void => {
    dispatch(setProductsPerPage(value));
  };

  const modsProductsContainer = {
    [style.grid_container]: selectedView === 'grid',
    [style.list_container]: selectedView === 'list',
  };
  const productSkeleton = [];

  for (let i = 0; i <= productsPerPage; i += 1) {
    productSkeleton.push(<Skeleton selectedView={selectedView} key={i} />);
  }

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
        {products.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChanged={setCurrentPage}
          />
        )}
      </div>

      <div className={cn(style.list, modsProductsContainer)}>
        {products?.map(product =>
          selectedView === 'list' ? (
            <ProductCardFull key={product.id} product={product} />
          ) : (
            <ProductCard key={product.id} product={product} />
          ),
        )}
        {loadingSlider === LoadingStatusEnum.Loading && productSkeleton}
      </div>
      {products.length > 0 && (
        <div className={style.control_panel}>
          <ProductsPerPage onChange={handleChangeSelect} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChanged={setCurrentPage}
          />
        </div>
      )}
      <ButtonQuestion />
    </div>
  );
};
