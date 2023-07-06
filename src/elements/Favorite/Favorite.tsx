import React, { FC, useState } from 'react';

import { useParams } from 'react-router-dom';

import style from './Favorite.module.scss';

import { FavouriteAddedIcon, FavouriteAddedToIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from 'store/reducers/productSliceNew';
import { ButtonIcon } from 'ui-kit';

interface IFavoriteProps {
  isFavorite: boolean;
}

export const Favorite: FC<IFavoriteProps> = ({ isFavorite = false }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<string>();
  const onClickHandler = (): void => {
    if (isFavorite) {
      dispatch(removeFavoriteProduct({ product_id: Number(productId) }));
    } else {
      dispatch(addFavoriteProduct({ product_id: Number(productId) }));
    }
  };

  return (
    <ButtonIcon className={style.favorite_container} onClick={onClickHandler}>
      {isFavorite ? <FavouriteAddedIcon /> : <FavouriteAddedToIcon />}
    </ButtonIcon>
  );
};
