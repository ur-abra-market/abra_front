import { useEffect, useState } from 'react';

import style from './ProductList.module.scss';
import { ViewGrid, ViewList, ViewType } from './ViewIcons/ViewIcons';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductCardFull, ProductCard } from 'modules';
import PaginatorProduct from 'old-components/ui/TypesView/product/PaginatorProduct';
import { ICategoryRequest } from 'services/product/product.serviceTypes';
import {
  getProductsCompilation,
  productsCompilationSelector,
} from 'store/reducers/productSlice';
import { ButtonInfo } from 'ui-kit';

export const ProductList = (): JSX.Element => {
  // const dataArr = useAppSelector(state => state.productPaginate.productsPage);

  const [selectedView, setSelectedView] = useState<ViewType>('grid');

  const category_id = 0;

  const products = useAppSelector(productsCompilationSelector)[category_id];

  const dispatch = useAppDispatch();

  useEffect(() => {
    const param = {
      offset: 0,
      limit: 20,
      category_id,
      sort_type: 'rating',
      ascending: false,
    } as ICategoryRequest;

    dispatch(getProductsCompilation(param));
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.control}>
        <div className={style.control_btns}>
          <ViewGrid selectedView={selectedView} setSelectedView={setSelectedView} />
          <ViewList selectedView={selectedView} setSelectedView={setSelectedView} />
          <div className={style.control_category}>{`< Clothes and Accessories`}</div>
        </div>
        <PaginatorProduct />
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
      <div className="control">
        {/* <ShowPageProduct /> */}
        <PaginatorProduct />
      </div>
      <div className={style.info_btn}>
        <ButtonInfo />
      </div>
    </div>
  );
};
