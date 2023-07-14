import React, { useEffect, useState } from 'react';

import style from './MainPage.module.scss';

import { ImagesBlock, StatusProduct } from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ProductSortEnum } from 'common/types';
import { Feedback, ProductCard } from 'elements';
import { ProductsPreview } from 'modules';
import {
  getProductsCompilation,
  productsCompilationSelector,
} from 'store/reducers/productSlice';
import { ButtonInfo, LoaderCircular, ViewMoreProducts } from 'ui-kit';

export enum Categories {
  ALL,
  CLOTHES,
  ACCESSORIES,
  COSMETICS,
}

type Category = Record<
  number,
  {
    label: string;
    category_id: Categories;
  }
>;

const CATEGORIES: Category = {
  0: {
    label: 'All categories',
    category_id: Categories.ALL,
  },
  1: {
    label: `Clothes`,
    category_id: Categories.CLOTHES,
  },
  2: {
    label: `Accessories`,
    category_id: Categories.ACCESSORIES,
  },
  3: {
    label: `Cosmetics and Self Care`,
    category_id: Categories.COSMETICS,
  },
};

export const MainPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.productListOld.statusProduct);

  const [isFetchingData, setIsFetchingData] = useState(true);

  const products = useAppSelector(productsCompilationSelector);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await Object.values(CATEGORIES).forEach(({ category_id }) => {
        dispatch(
          getProductsCompilation({
            offset: 0,
            limit: 23,
            category_id,
            sort_type: ProductSortEnum.DATE,
            ascending: false,
          }),
        );
      });
      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch, filter]);

  return (
    <div className={style.main_page}>
      {isFetchingData ? (
        <LoaderCircular variant="circular-min" />
      ) : (
        <div>
          <ImagesBlock className={style.images_block} />
          <div className={style.container}>
            <StatusProduct />
            <div className={style.main_sliders}>
              {products &&
                Object.keys(products).map(key => {
                  return (
                    <ProductsPreview key={key} title={CATEGORIES[+key].label}>
                      {products[+key].map(product => (
                        <ProductCard key={product.uuid} product={product} />
                      ))}
                      <ViewMoreProducts />
                    </ProductsPreview>
                  );
                })}
            </div>
            <div className={style.info_block}>
              <ButtonInfo className={style.info_btn} />
            </div>
          </div>
          <Feedback />
        </div>
      )}
    </div>
  );
});
