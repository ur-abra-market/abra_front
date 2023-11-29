import React, { useEffect, useState } from 'react';

import { ImagesBlock, StatusProduct, SubscriptionAndContacts } from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { ViewMoreProductsLink } from 'elements';
import { ProductCard, ProductsPreview } from 'modules';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { getAllCategories } from 'store/reducers/commonSlice';
import {
  getProductsCompilation,
  productsCompilationSelector,
} from 'store/reducers/productSlice';
import { loadingProductsSelector } from 'store/reducers/productSlice/selectors';
import { ButtonQuestion, LoaderCircular, LoaderLinear } from 'ui-kit';

import style from './MainPage.module.scss';

type Category = Record<
  number,
  {
    label: string;
    category_id: number;
  }
>;

const TARGET_CATEGORIES = ['Women', 'Men', 'Kids'];

export const MainPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const loadingSlider = useAppSelector(loadingProductsSelector);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const products = useAppSelector(productsCompilationSelector);
  const categories = useAppSelector(state => state.common.categories);
  const allCategories = findCategories(categories, TARGET_CATEGORIES);

  const myProducts = allCategories.reduce((result, curr, index, arr) => {
    if (arr.length - 1 === index) {
      return {
        1: { label: 'All categories', category_id: 1 },
        ...result,
        [curr.id]: { label: `${curr.name} clothes`, category_id: curr.id },
      };
    }

    return {
      ...result,
      [curr.id]: { label: `${curr.name} clothes`, category_id: curr.id },
    };
  }, {} as Category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    fetchData();
  }, [categories]);

  const fetchData = async (): Promise<void> => {
    Object.keys(myProducts).forEach(el => {
      setIsFetchingData(true);
      dispatch(
        getProductsCompilation({
          offset: 0,
          limit: 23,
          category_id: el.toString(),
          ascending: false,
        }),
      );
      setIsFetchingData(false);
    });
  };

  return (
    <div className={style.main_page}>
      {isFetchingData ? (
        <LoaderLinear />
      ) : (
        <div>
          <ImagesBlock className={style.images_block} />

          <div className={style.status_container}>
            <StatusProduct />
          </div>

          <div className={style.container}>
            <div className={style.main_sliders}>
              {loadingSlider === LoadingStatusEnum.Loading && (
                <LoaderCircular className={style.loading_slider} />
              )}
              {products &&
                Object.keys(products).map(id => {
                  return (
                    <ProductsPreview
                      key={myProducts[+id].category_id}
                      title={myProducts[+id].label}
                    >
                      {products[myProducts[+id].category_id].map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                      <ViewMoreProductsLink />
                    </ProductsPreview>
                  );
                })}
            </div>
            <ButtonQuestion />
          </div>

          <SubscriptionAndContacts />
        </div>
      )}
    </div>
  );
});

// рекурсивный поиск категорий по имени
function findCategories(
  categories: ICategoryResponse[],
  targetCategories: string[],
): ICategoryResponse[] {
  const result: ICategoryResponse[] = [];

  categories.forEach(category => {
    if (targetCategories.includes(category.name)) {
      result.push(category);
    }

    if (category.children) {
      const childCategories = findCategories(category.children, targetCategories);

      if (childCategories.length > 0) {
        result.push(...childCategories);
      }
    }
  });

  return result;
}
