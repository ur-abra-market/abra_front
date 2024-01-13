import React from 'react';

import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  AboutProduct,
  FavoriteButton,
  ProductDescription,
  ProductFeedback,
  ProductParams,
  ProductPrice,
  SupplierInfo,
  Tags,
} from 'elements';
import { Bundles } from 'pages/general-pages/ProductPage/Bundles/Bundles';
import {
  favoriteProductSelector,
  productDescriptionSelector,
  productNameSelector,
  productTagsSelector,
} from 'store/reducers/productSlice';
import {
  addFavoriteProductPage,
  removeFavoriteProductPage,
} from 'store/reducers/productSlice/thunks';
import { Button, Title } from 'ui-kit';

import style from './ProductDetails.module.scss';

export const ProductDetails = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(productNameSelector);
  const description = useAppSelector(productDescriptionSelector);
  const { productId } = useParams<string>();
  const isFavorite = useAppSelector(favoriteProductSelector);
  const handleChangeFavorite = (isFavorite: boolean): void => {
    if (isFavorite) {
      dispatch(addFavoriteProductPage({ product_id: Number(productId) }));
    } else {
      dispatch(removeFavoriteProductPage({ product_id: Number(productId) }));
    }
  };

  return (
    <div className={style.product_details_container}>
      <div className={cn(style.section)}>
        <Title className={style.product_title}>{title}</Title>
        <FavoriteButton
          isFavorite={isFavorite}
          onChange={handleChangeFavorite}
          variant="product"
          className={style.favorite_button}
        />
        <Bundles />
        <ProductParams />
        <ProductPrice />
        <Button className={style.button}>Add to Cart</Button>
      </div>
      <SupplierInfo />
      <AboutProduct />
      <ProductFeedback />
      <ProductDescription description={description} />
    </div>
  );
};
