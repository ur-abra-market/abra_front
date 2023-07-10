import React, { FC } from 'react';

import style from './Favorite.module.scss';

import { FavouriteAddedIcon, FavouriteAddedToIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { addFavoriteProduct, removeFavoriteProduct } from 'store/reducers/productSlice';
import { ButtonIcon } from 'ui-kit';

interface IFavoriteProps {
  isFavorite: boolean;
  product_id: number;
}

export const Favorite: FC<IFavoriteProps> = ({
  isFavorite = false,
  product_id,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const onClickHandler = (): void => {
    if (isFavorite) {
      dispatch(removeFavoriteProduct({ product_id }));
    } else {
      dispatch(addFavoriteProduct({ product_id }));
    }
  };

  return (
    <ButtonIcon className={style.favorite_container} onClick={onClickHandler}>
      {isFavorite ? <FavouriteAddedIcon /> : <FavouriteAddedToIcon />}
    </ButtonIcon>
  );
};
