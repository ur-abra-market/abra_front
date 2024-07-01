import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ProductMainInfo } from './components/ProductMainInfo/ProductMainInfo';
import { ProductPageHeader } from './components/ProductPageHeader/ProductPageHeader';
import { ProductRecommendations } from './components/ProductRecommendations/ProductRecommendations';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  getPopularProducts,
  getProductById,
  getSimilarProducts,
  productCategorySelector,
} from 'store/reducers/productSlice';
import { getBreadCrumbs } from 'store/reducers/productSlice/thunks';
import { LoaderLinear } from 'ui-kit';

import style from './ProductPage.module.scss';

export const ProductPage = WithLayout((): JSX.Element => {
  const categoryId = useAppSelector(productCategorySelector);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productId) return;
    const fetchData = async (): Promise<void> => {
      await dispatch(getProductById({ product_id: Number(productId) }));
      await dispatch(
        getSimilarProducts({ category_id: Number(productId), offset: 0, limit: 10 }),
      );
      await dispatch(
        getPopularProducts({ category_id: Number(productId), offset: 0, limit: 10 }),
      );
      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch, productId]);

  useEffect(() => {
    const fetchingBreadCrumbs = async (): Promise<void> => {
      await dispatch(getBreadCrumbs({ category_id: String(categoryId.id) }));
    };

    if (categoryId?.id) {
      fetchingBreadCrumbs();
    }
  }, [categoryId, dispatch]);

  if (isFetchingData) return <LoaderLinear />;

  return (
    <div className={style.product_container}>
      <div className={style.wrapper}>
        <ProductPageHeader />
        <ProductMainInfo />
        <ProductRecommendations />
      </div>
    </div>
  );
}, 'default');
