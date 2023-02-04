import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { InfoBtn } from 'components/buttons';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/Loader';
import ChoiceProduct from 'components/ui/product/ChoiceProduct';
import FlagFavorites from 'components/ui/product/FlagFavorites';
import LatestSearch from 'components/ui/product/LatestSearch';
import ProductAbout from 'components/ui/product/ProductAbout';
import ProductPath from 'components/ui/product/ProductPath';
import ProductPhoto from 'components/ui/product/ProductPhoto';
import ProductStatistics from 'components/ui/product/ProductStatistics';
import Reward from 'components/ui/product/Reward';
import StatusSeller from 'components/ui/product/StatusSeller';
import { Status } from 'enums/status.enum';
import { PopularProduct } from 'pages/ProductPage/PopularProduct/PopularProduct';
import style from 'pages/ProductPage/ProductPage.module.css';
import ProductReview from 'pages/ProductPage/ProductReview/ProductReview';
import { SimilarProduct } from 'pages/ProductPage/SimilarProduct/SimilarProduct';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getPopularProductsById } from 'store/reducers/popularProducts';
import { getSimilarProducts } from 'store/reducers/similarProducts';
import {
  getGradesByProductId,
  getImagesByProductId,
  getProductById,
} from 'store/reducers/targetProductSlice';

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

  console.log('RENDER!!!!');

  useEffect(() => {
    if (!productId) return;
    dispatch(getProductById({ product_id: +productId }));
    dispatch(getImagesByProductId({ product_id: +productId }));
    dispatch(getGradesByProductId({ product_id: +productId }));
    dispatch(getSimilarProducts({ product_id: +productId, page_num: 1, page_size: 10 }));
    dispatch(
      getPopularProductsById({ product_id: +productId, page_num: 1, page_size: 10 }),
    );
  }, [productId]);

  const addOrRemoveProductFavorites = (): void => {
    // добавление в избранное логика
  };

  // TODO заглушка - убрать
  console.log('status', status);
  if (status === Status.Loading || status === Status.Idle) return <Loader />;
  if (status === Status.Failed)
    throw Error('[ProductPage] - Status запроса failed. Не работает api!!!');

  return (
    <>
      <Header />
      <main className={style.productPage}>
        {/* <Modal active={modalOpen} close={setModalOpen}> */}

        {/* </Modal> */}
        <div className={style.productPage__basic}>
          <div className={style.productPage__basic_left}>
            <ProductPath pathArr={[product.category_path, '/Dress', '/Spring-Summer']} />
            {images && <ProductPhoto photoArray={images} />}
          </div>
          <div className={style.productPage__basic_right}>
            <div className={style.productPage__basic_top}>
              <Reward star grade={product.grade} />
              <FlagFavorites
                active={product.is_favorite}
                onClick={addOrRemoveProductFavorites}
              />
            </div>
            <h2>
              <span>{product.product_name}</span>
            </h2>
            <div className={style.productPage__basic_block1}>
              <div className={style.productPage__basic_path}>
                {product.tags?.map(tag => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
            </div>
            <div className={style.productPage__basic_block2}>
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
            <button className={style.productPage__button} type="button">
              Add to Cart
            </button>
            <div className={style.productPage__line} />
            <StatusSeller supplierInfo={product.supplier_info} />
          </div>
        </div>

        <ProductAbout />
        <ProductReview />
        <SimilarProduct />
        <PopularProduct />
        <LatestSearch latestSearchData={latestSearchData || []} />
        <InfoBtn />
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
