import React, { useEffect, useState } from 'react';

import { Container } from '../../components';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../components/ProductsPreview/ProductsPreview';
import { ProductSortType } from '../../enums/productSortType.enum';
import { WithLayout } from '../../hocs/WithLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { ImagesBlock } from './ImagesBlock/ImagesBlock';
import style from './MainPage.module.css';

import { InfoBtn } from 'components/buttons';
import Feedback from 'components/new-components/feedback/Feedback';
import StatusProduct from 'pages/MainPage/StatusProduct';
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
type CategoryPagesType = { [key: number]: CategoryPageDataType };
type CategoryPageDataType = {
  offset: number;
  limit: number;
  sort_type: ProductSortType;
  ascending: boolean;
};

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
const OFFSET_VALUE = 12;
const DEFAULT_CONFIG = {
  offset: 0,
  limit: OFFSET_VALUE,
  sort_type: ProductSortType.DATE,
  ascending: false,
};
const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.product.statusProduct);
  const { products } = useAppSelector(state => state.mainPageProducts);
  const [categoryPages, setCategoryPages] = useState<CategoryPagesType>({
    [Categories.ALL]: DEFAULT_CONFIG,
    [Categories.CLOTHES]: DEFAULT_CONFIG,
    [Categories.ACCESSORIES]: DEFAULT_CONFIG,
    [Categories.COSMETICS]: DEFAULT_CONFIG,
  });
  const changeCategoryOffset = (category_id: number): void => {
    const currentCategory: CategoryPageDataType = categoryPages[category_id];

    setCategoryPages({
      ...categoryPages,
      [category_id]: {
        ...currentCategory,
        limit: currentCategory.limit + OFFSET_VALUE,
      },
    });
    dispatch(
      fetchProductList({
        offset: currentCategory.offset,
        limit: currentCategory.limit + OFFSET_VALUE,
        category_id,
        sort_type: currentCategory.sort_type,
        ascending: currentCategory.ascending,
      }),
    );
  };

  useEffect(() => {
    Object.values(CATEGORIES).forEach(({ category_id }) => {
      dispatch(
        fetchProductList({
          offset: categoryPages[category_id].offset,
          limit: categoryPages[category_id].limit,
          category_id,
          sort_type: categoryPages[category_id].sort_type,
          ascending: categoryPages[category_id].ascending,
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
                <ProductsPreview
                  key={key}
                  title={CATEGORIES[+key].label}
                  category={CATEGORIES[+key].category_id.toString()}
                  changeCategoryOffset={changeCategoryOffset}
                >
                  {products[+key].map((product, i) => (
                    <ProductCard key={`${key}-${i}`} product={product} />
                  ))}
                </ProductsPreview>
              );
            })}
        </div>
        <div className={style.info_block}>
          <InfoBtn className={style.info_btn} />
        </div>
      </Container>
      <Feedback />
    </div>
  );
};

export default WithLayout(MainPage);
