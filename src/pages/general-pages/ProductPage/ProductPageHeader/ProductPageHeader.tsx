import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Grades, BreadCrumbs, FavoriteButton } from 'elements';
import {
  favoriteProductSelector,
  productGradeSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSlice';
import { productBreadCrumbsSelector } from 'store/reducers/productSlice/selectors';
import {
  addFavoriteProductPage,
  removeFavoriteProductPage,
} from 'store/reducers/productSlice/thunks';

import style from './ProductPageHeader.module.scss';

export const ProductPageHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(favoriteProductSelector);
  const grade = useAppSelector(productGradeSelector);
  const totalOrders = useAppSelector(productTotalOrdersSelector);
  const breadCrumbs = useAppSelector(productBreadCrumbsSelector);
  const { productId } = useParams<string>();
  const reverseBread = [...breadCrumbs].reverse();
  const product = useAppSelector(state => state.product.productCard);
  const handleChangeFavorite = (isFavorite: boolean): void => {
    if (isFavorite) {
      dispatch(addFavoriteProductPage({ product_id: Number(productId) }));
    } else {
      dispatch(removeFavoriteProductPage({ product_id: Number(productId) }));
    }
  };

  console.log(product);

  return (
    <div className={style.product_page_wrapper}>
      <BreadCrumbs breadCrumbs={reverseBread} />
      <Grades grade={grade} count={totalOrders} />
      <FavoriteButton
        isFavorite={isFavorite}
        onChange={handleChangeFavorite}
        variant="product"
      />
    </div>
  );
};
