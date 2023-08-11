import { useEffect, useState } from 'react';

import cn from 'classnames';

import style from './ProductList.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductsPerPage, PageViewSwitcher } from 'elements';
import { ViewType } from 'elements/PageViewSwitcher/PageViewSwitcher';
import { ProductCardFull, ProductCard } from 'modules';
import { ICategoryRequest } from 'services/product/product.serviceTypes';
import { setShowBy } from 'store/reducers/productPaginateSlice';
import {
  getProductsCompilation,
  productsCompilationSelector,
} from 'store/reducers/productSlice';
import { ButtonInfo } from 'ui-kit';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const ProductList = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedView, setSelectedView] = useState<ViewType>('grid');
  const showBy = useAppSelector(state => state.productPaginate.showBy);
  const category_id: number = 10;
  const products = useAppSelector(productsCompilationSelector)[category_id];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const param = {
      offset: (currentPage - 1) * showBy,
      limit: showBy,
      category_id,
      ascending: false,
    } as ICategoryRequest;

    dispatch(getProductsCompilation(param));
  }, [dispatch, showBy, currentPage]);

  const handlerChangeSelect = (value: number): void => {
    dispatch(setShowBy(value));
  };

  const modsProductsContainer = {
    [style.grid_container]: selectedView === 'grid',
    [style.list_container]: selectedView === 'list',
  };

  return (
    <div className={style.wrapper}>
      <div className={style.control_panel}>
        <div className={style.view_switchers}>
          <PageViewSwitcher
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <div className={style.branch_crumbs}>{`bread > crumb > plug`}</div>
        </div>
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          onPageChanged={setCurrentPage}
        />
      </div>

      <div className={cn(style.list, modsProductsContainer)}>
        {products?.map(product =>
          selectedView === 'list' ? (
            <ProductCardFull key={product.id} product={product} />
          ) : (
            <ProductCard key={product.id} product={product} />
          ),
        )}
      </div>

      <div className={style.control_panel}>
        <ProductsPerPage onChange={handlerChangeSelect} />
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          onPageChanged={setCurrentPage}
        />
      </div>

      <ButtonInfo className={style.info_button} />
    </div>
  );
};
