import { useEffect, useState } from 'react';

import style from './ProductList.module.scss';
import { ViewGrid, ViewList, ViewType } from './ViewIcons/ViewIcons';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductCardFull, ProductCard } from 'modules';
import { ICategoryRequest } from 'services/product/product.serviceTypes';
import {
  getProductsCompilation,
  productsCompilationSelector,
} from 'store/reducers/productSlice';
import { ButtonInfo } from 'ui-kit';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const ProductList = (): JSX.Element => {
  // const dataArr = useAppSelector(state => state.productPaginate.productsPage);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedView, setSelectedView] = useState<ViewType>('grid');

  const category_id: number = 10;

  const products = useAppSelector(productsCompilationSelector)[category_id];

  const dispatch = useAppDispatch();

  useEffect(() => {
    const param = {
      offset: 0,
      limit: 20,
      category_id,
      ascending: false,
    } as ICategoryRequest;

    dispatch(getProductsCompilation(param));
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.control_panel}>
        <div className={style.view_switchers}>
          <ViewGrid selectedView={selectedView} setSelectedView={setSelectedView} />
          <ViewList selectedView={selectedView} setSelectedView={setSelectedView} />
          <div className={style.branch_crumbs}>{`bread > crumb > plug`}</div>
        </div>
        <Pagination
          totalPages={5}
          currentPage={currentPage}
          onPageChanged={setCurrentPage}
        />
      </div>

      <div className={style.list}>
        {products &&
          products.map((product, index) =>
            selectedView === 'list' ? (
              <ProductCardFull key={`product-${index}`} product={product} />
            ) : (
              <ProductCard key={`product-${index}`} product={product} />
            ),
          )}
      </div>

      <div className={style.control_panel}>
        <div>show page (TODO)</div>
        <Pagination
          totalPages={5}
          currentPage={currentPage}
          onPageChanged={setCurrentPage}
        />
      </div>

      <div className={style.info_button}>
        <ButtonInfo />
      </div>
    </div>
  );
};
