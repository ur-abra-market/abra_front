import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Status } from '../../../store/enums/status.enum';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getPopularProductsById } from '../../../store/reducers/popularProducts';
import { getSimilarProducts } from '../../../store/reducers/similarProducts';
import {
  getGradesByProductId,
  getImagesByProductId,
  getProductById,
} from '../../../store/reducers/targetProductSlice';
import { InfoBtn } from '../../common/buttons';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Loader from '../../common/Loader';
import ChoiceProduct from '../../ui/product/ChoiceProduct';
import FlagFavorites from '../../ui/product/FlagFavorites';
import LatestSearch from '../../ui/product/LatestSearch';
import ProductAbout from '../../ui/product/ProductAbout';
import ProductPath from '../../ui/product/ProductPath';
import ProductPhoto from '../../ui/product/ProductPhoto';
import ProductStatistics from '../../ui/product/ProductStatistics';
import Reward from '../../ui/product/Reward';
import StatusSeller from '../../ui/product/StatusSeller';

import { PopularProduct } from './PopularProduct/PopularProduct';
import style from './ProductPage.module.css';
import ProductReview from './ProductReview/ProductReview';
import { SimilarProduct } from './SimilarProduct/SimilarProduct';

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

// {
//     "result": {
//     "grade": {
//         "grade_average": "0.0",
//             "count": 0
//     },
//     "category_id": 25,
//         "category_path": "/Men's clothes/Clothing/Shirts",
//         "product_name": "sdfsdf",
//         "is_favorite": false,
//         "tags": [],
//         "colors": [
//         "blue",
//         "pink",
//         "purple"
//     ],
//         "sizes": [
//         "6XL",
//         "L",
//         "XL"
//     ],
//         "monthly_actual_demand": "0",
//         "daily_actual_demand": "0",
//         "prices": [
//         {
//             "value": "2.00",
//             "min_quantity": 3,
//             "discount": null,
//             "start_date": "2022-11-05 13:59:56",
//             "end_date": null
//         }
//     ],
//         "supplier_info": {
//         "name": "fghfd",
//             "grade_average": "0.0",
//             "total_deals": "6075",
//             "value": 3,
//             "period": "months"
//     }
// }
// }

const ProductPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<string>();

  const { product, status, images } = useAppSelector(state => state.targetProduct);

  console.log('RENDER!!!!');

  useEffect(() => {
    // @ts-ignore
    dispatch(getProductById({ product_id: productId }));
    // @ts-ignore
    dispatch(getImagesByProductId({ product_id: productId }));
    // @ts-ignore
    dispatch(getGradesByProductId({ product_id: productId }));
    // @ts-ignore
    dispatch(getSimilarProducts({ productId }));
    // @ts-ignore
    dispatch(getPopularProductsById({ product_id: productId }));
  }, [productId]);

  const addOrRemoveProductFavorites = (): void => {
    // добавление в избранное логика
  };

  if (status === Status.Loading) return <Loader />;

  // TODO обработать все ошибки если нет данных!!!!!! и правильную переадресацию - сейчас заглушка
  if (!product) return <div />;

  const {
    grade,
    category_path,
    product_name,
    is_favorite,
    tags,
    colors,
    sizes,
    monthly_actual_demand,
    daily_actual_demand,
    supplier_info,
    prices,
  } = product;

  return (
    <>
      <Header />
      <main className={style.productPage}>
        {/* <Modal active={modalOpen} close={setModalOpen}> */}

        {/* </Modal> */}
        <div className={style.productPage__basic}>
          <div className={style.productPage__basic_left}>
            <ProductPath pathArr={[category_path, '/Dress', '/Spring-Summer']} />
            {images && <ProductPhoto photoArray={images} />}
          </div>
          <div className={style.productPage__basic_right}>
            <div className={style.productPage__basic_top}>
              <Reward star grade={grade} />
              <FlagFavorites active={is_favorite} onClick={addOrRemoveProductFavorites} />
            </div>
            <h2>
              <span>{product_name}</span>
            </h2>
            <div className={style.productPage__basic_block1}>
              <div className={style.productPage__basic_path}>
                {
                  // @ts-ignore
                  tags?.map(tag => (
                    <p key={tag}>{tag}</p>
                  ))
                }
              </div>
            </div>
            <div className={style.productPage__basic_block2}>
              <ChoiceProduct
                // @ts-ignore
                colors={colors?.length !== 0 ? colors : ['red', 'blue', 'black', 'beige']}
              />
              <ProductStatistics
                // @ts-ignore
                sizes={sizes?.length !== 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                dailyActualDemand={daily_actual_demand}
                // @ts-ignore
                prices={prices?.[0]}
                // @ts-ignore
                monthlyActualDemand={monthly_actual_demand}
              />
            </div>
            <button className={style.productPage__button} type="button">
              Add to Cart
            </button>
            <div className={style.productPage__line} />
            <StatusSeller supplierInfo={supplier_info} />
          </div>
        </div>

        <ProductAbout />
        <ProductReview />
        <SimilarProduct />
        <PopularProduct />
        <LatestSearch latestSearchData={latestSearchData} />
        <InfoBtn />
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
