import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Container } from '../../components';
import Loader from '../../components/Loader';
import ProductCarousel from '../../components/new-components/ProductCarousel/ProductCarousel';
import { Button } from '../../components/ui-kit';
import { Status } from '../../enums/status.enum';
import { WithLayout } from '../../hocs/WithLayout';
import { IImageProduct } from '../../interfaces';
import { getPopularProductsById } from '../../store/reducers/popularProducts';
import { getSimilarProducts } from '../../store/reducers/similarProducts';
import { getGradesByProductId } from '../../store/reducers/targetProductSlice';

import ChoiceProduct from 'components/ui/product/ChoiceProduct';
import FlagFavorites from 'components/ui/product/FlagFavorites';
import LatestSearch from 'components/ui/product/LatestSearch';
import ProductAbout from 'components/ui/product/ProductAbout';
import ProductPath from 'components/ui/product/ProductPath';
import ProductStatistics from 'components/ui/product/ProductStatistics';
import Reward from 'components/ui/product/Reward';
import StatusSeller from 'components/ui/product/StatusSeller';
import { PopularProduct } from 'pages/ProductPage/PopularProduct/PopularProduct';
import style from 'pages/ProductPage/ProductPage.module.css';
import ProductReview from 'pages/ProductPage/ProductReview/ProductReview';
import { SimilarProduct } from 'pages/ProductPage/SimilarProduct/SimilarProduct';
import { useAppDispatch, useAppSelector } from 'store/hooks';

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

const ProductPage = (): JSX.Element => {
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
  }, [productId]);

  const addOrRemoveProductFavorites = (): void => {
    // добавление в избранное логика
  };

  if (status === Status.Loading || status === Status.Idle) return <Loader />;

  return (
    <Container>
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
      <ProductReview />
      <SimilarProduct />
      <PopularProduct />
      <LatestSearch latestSearchData={latestSearchData || []} />
    </Container>
  );
};

export default WithLayout(ProductPage);
