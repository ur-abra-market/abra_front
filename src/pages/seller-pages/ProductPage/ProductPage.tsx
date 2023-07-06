import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ProductMainInfo } from './ProductMainInfo/ProductMainInfo';
import style from './ProductPage.module.scss';
import { ProductPageHeader } from './ProductPageHeader/ProductPageHeader';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch } from 'common/hooks';
import { getProductById } from 'store/reducers/productSliceNew';
import { LoaderLinear } from 'ui-kit';

export const ProductPage = WithLayout((): JSX.Element => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productId) return;
    const fetchData = async (): Promise<void> => {
      await dispatch(getProductById({ product_id: Number(productId) }));
      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch, productId]);

  if (isFetchingData) return <LoaderLinear />;

  return (
    <div className={style.product_container}>
      <ProductPageHeader />
      <ProductMainInfo />
    </div>
  );
});
