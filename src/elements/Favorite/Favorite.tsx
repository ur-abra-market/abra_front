import { FC } from 'react';

import cn from 'classnames';

import style from './Favorite.module.scss';

import { FavoriteAddedToIcon } from 'assets/icons';
import { ButtonIcon } from 'ui-kit';

interface IFavoriteProps {
  isFavorite: boolean;
  onChange: (isFavorite: boolean) => void;
  className?: string;
  variant?: 'productCard' | 'product';
}

export const Favorite: FC<IFavoriteProps> = ({
  isFavorite,
  onChange,
  className,
  variant = 'productCard',
}): JSX.Element => {
  const onClickHandler = (): void => {
    onChange(!isFavorite);
  };

  const modsButton = cn(style.favorite_button, className, {
    [style.product_button]: variant === 'product',
    [style.product_card_button]: variant === 'productCard',
  });

  return (
    <ButtonIcon className={modsButton} onClick={onClickHandler}>
      <FavoriteAddedToIcon className={isFavorite ? style.active : ''} />
    </ButtonIcon>
  );
};
