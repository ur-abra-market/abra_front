import React, { useEffect } from 'react';

import { WithLayout } from '../../../common/hocs/WithLayout';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { ProductSortType } from '../../../common/types/enums/productSortType.enum';
import { Feedback, ProductCard, ProductsPreview } from '../../../components';
import { ButtonInfo, Container, ViewMore } from '../../../ui-kit';

import style from './MainPage.module.css';

import { ImagesBlock, StatusProduct } from './index';

import { fetchProductList } from 'store/reducers/mainPageSlice';

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
  const filter = useAppSelector(state => state.product.statusProduct);
  const { products } = useAppSelector(state => state.mainPageProducts);

  useEffect(() => {
    Object.values(CATEGORIES).forEach(({ category_id }) => {
      dispatch(
        fetchProductList({
          offset: 0,
          limit: 23,
          category_id,
          sort_type: ProductSortType.DATE,
          ascending: false,
        }),
      );
    });
  }, [dispatch, filter]);

  return (
    <div className={style.main_page}>
      <ImagesBlock className={style.images_block} />
      <Container>
        <StatusProduct />
        <div className={style.main_sliders}>
          {products &&
            Object.keys(products).map(key => {
              return (
                <ProductsPreview key={key} title={CATEGORIES[+key].label}>
                  {products[+key].map(product => (
                    <ProductCard key={product.uuid} product={product} />
                  ))}
                  <ViewMore />
                </ProductsPreview>
              );
            })}
        </div>
        <div className={style.info_block}>
          <ButtonInfo className={style.info_btn} />
        </div>
      </Container>
      <Feedback />
    </div>
  );
});
