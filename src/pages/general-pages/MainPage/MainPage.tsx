import React, { useEffect, useState } from 'react';

import style from './MainPage.module.scss';

import { ImagesBlock, StatusProduct, SubscriptionAndContacts } from '.';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ViewMoreProductsLink } from 'elements';
import { ProductsPreview, ProductCard } from 'modules';
import {
  getProductsCompilation,
  productsCompilationSelector,
} from 'store/reducers/productSlice';
import { ButtonInfo, LoaderLinear } from 'ui-kit';

export enum Categories {
  ALL = 8,
  CLOTHES = 9,
  ACCESSORIES = 10,
  COSMETICS = 11,
}

type Category = Record<
  number,
  {
    label: string;
    category_id: Categories;
  }
>;

const CATEGORIES: Category = {
  8: {
    label: 'All categories',
    category_id: Categories.ALL,
  },
  9: {
    label: `Clothes`,
    category_id: Categories.CLOTHES,
  },
  10: {
    label: `Accessories`,
    category_id: Categories.ACCESSORIES,
  },
  11: {
    label: `Cosmetics and Self-Care`,
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
      Object.values(CATEGORIES).forEach(async ({ category_id }) => {
        await dispatch(
          getProductsCompilation({
            offset: 0,
            limit: 23,
            category_id,
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
        <LoaderLinear />
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
                      <ViewMoreProductsLink />
                    </ProductsPreview>
                  );
                })}
            </div>
            <div className={style.info_block}>
              <ButtonInfo className={style.info_button} />
            </div>
          </div>
          <SubscriptionAndContacts />
        </div>
      )}
    </div>
  );
});
