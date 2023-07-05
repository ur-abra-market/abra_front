import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { PopularProduct } from './PopularProduct/PopularProduct';
import style from './ProductPage.module.scss';
import { SimilarProduct } from './SimilarProduct/SimilarProduct';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { IImageProduct, LoadingStatusEnum } from 'common/types';
import ProductCarousel from 'elements/ProductCarousel/ProductCarousel';
import ProductReview from 'old-components/ProductPageOld/ProductReview/ProductReview';
import ChoiceProduct from 'old-components/ui/product/ChoiceProduct';
import FlagFavorites from 'old-components/ui/product/FlagFavorites';
import LatestSearch from 'old-components/ui/product/LatestSearch';
import ProductAbout from 'old-components/ui/product/ProductAbout';
import ProductPath from 'old-components/ui/product/ProductPath';
import ProductStatistics from 'old-components/ui/product/ProductStatistics';
import Reward from 'old-components/ui/product/Reward';
import StatusSeller from 'old-components/ui/product/StatusSeller';
import { getPopularProductsById } from 'store/reducers/popularProducts';
import { getSimilarProducts } from 'store/reducers/similarProducts';
import { getGradesByProductId } from 'store/reducers/targetProductSlice';
import { Button, LoaderCircular } from 'ui-kit';

const latestSearchData = [
  { search_query: 'Tag 1', datetime: '' },
  { search_query: 'Tag 2', datetime: '' },
  { search_query: 'Tag 3', datetime: '' },
  { search_query: 'Tag 4', datetime: '' },
  { search_query: 'Tag 5', datetime: '' },
  { search_query: 'Tag 6', datetime: '' },
  { search_query: 'Tag 7', datetime: '' },
  { search_query: 'Tag 8', datetime: '' },
  { search_query: 'Tag 9', datetime: '' },
  { search_query: 'Tag 10', datetime: '' },
  { search_query: 'Tag 11', datetime: '' },
  { search_query: 'Tag 12', datetime: '' },
  { search_query: 'Tag 13', datetime: '' },
  { search_query: 'Tag 14', datetime: '' },
  { search_query: 'Tag 15', datetime: '' },
];

export const ProductPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<string>();

  const { product, status, images } = useAppSelector(state => state.targetProduct);

  const productsArr: string[] = [];

  images.forEach((el: IImageProduct) => {
    productsArr.push(el.image_url);
  });

  useEffect(() => {
    if (!productId) return;
    // dispatch(getProductById({ product_id: +productId }));
    // dispatch(getImagesByProductId({ product_id: +productId }));
    dispatch(getGradesByProductId({ product_id: +productId }));
    dispatch(getSimilarProducts({ product_id: +productId, page_num: 1, page_size: 10 }));
    dispatch(
      getPopularProductsById({ product_id: +productId, page_num: 1, page_size: 10 }),
    );
  }, [productId, dispatch]);

  const addOrRemoveProductFavorites = (): void => {
    // добавление в избранное логика
  };

  if (status === LoadingStatusEnum.Loading || status === LoadingStatusEnum.Idle)
    return <LoaderCircular />;

  return (
    <div className={style.container}>
      <div className={style.basic}>
        <div className={style.basic_left}>
          <ProductPath pathArr={[product.category_path, '/Dress', '/Spring-Summer']} />
          {images && <ProductCarousel photoArray={productsArr} />}
        </div>
        <div className={style.basic_right}>
          <div className={style.basic_top}>
            <Reward star grade={product.grade} />
            <FlagFavorites
              active={product.is_favorite}
              onClick={addOrRemoveProductFavorites}
            />
          </div>
          <h2>
            <span>{product.product_name}</span>
          </h2>
          <div className={style.basic_block1}>
            <div className={style.basic_path}>
              {product.tags?.map(tag => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
          </div>
          <div className={style.basic_block2}>
            <ChoiceProduct
              colors={
                product.colors?.length !== 0
                  ? product.colors
                  : ['red', 'blue', 'black', 'beige']
              }
            />
            <ProductStatistics
              sizes={
                product.sizes.length !== 0
                  ? product.sizes
                  : ['XS', 'S', 'M', 'L', 'XL', 'XXL']
              }
              dailyActualDemand={product.daily_actual_demand}
              prices={product.prices?.[0]}
              monthlyActualDemand={product.monthly_actual_demand}
            />
          </div>
          <Button className={style.button}>Add to Cart</Button>
          <div className={style.line} />
          <StatusSeller supplierInfo={product.supplier_info} />
        </div>
      </div>

      <ProductAbout />
      <ProductReview className={style.review_wrapper} />
      <SimilarProduct />
      <PopularProduct />
      <LatestSearch latestSearchData={latestSearchData || []} />
    </div>
  );
});
