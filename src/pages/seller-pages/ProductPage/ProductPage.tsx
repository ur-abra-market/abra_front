import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ProductMainInfo } from './ProductMainInfo/ProductMainInfo';
import { ProductOverview } from './ProductOverview/ProductOverview';
import { ProductPageHeader } from './ProductPageHeader/ProductPageHeader';
import { ProductRecommendations } from './ProductRecommendations/ProductRecommendations';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch } from 'common/hooks';
import { getProductById } from 'store/reducers/productSlice';
import { LoaderLinear } from 'ui-kit';

import style from './ProductPage.module.scss';

export const ProductPage = WithLayout((): JSX.Element => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productId) return;
    const fetchData = async (): Promise<void> => {
      await dispatch(getProductById({ product_id: Number(productId) }));
      // await dispatch(
      //   getSimilarProducts({ product_id: Number(productId), page_num: 0, page_size: 10 }),
      // );
      // await dispatch(
      //   getPopularProducts({ product_id: Number(productId), page_num: 0, page_size: 10 }),
      // );
      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch, productId]);

  if (isFetchingData) return <LoaderLinear />;

  return (
    <div className={style.product_container}>
      <ProductPageHeader />
      <ProductMainInfo />
      <ProductOverview />
      <ProductRecommendations />
    </div>
  );
});
