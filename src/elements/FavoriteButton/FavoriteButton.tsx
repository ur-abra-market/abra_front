import { FC } from 'react';

import cn from 'classnames';

import style from './FavoriteButton.module.scss';

import { FavoriteAddedToIcon } from 'assets/icons';
import { ButtonIcon } from 'ui-kit';

interface IFavoriteButton {
  isFavorite: boolean;
  onChange: (isFavorite: boolean) => void;
  className?: string;
  variant?: 'productCard' | 'product';
}

export const FavoriteButton: FC<IFavoriteButton> = ({
  isFavorite,
  onChange,
  className,
  variant = 'productCard',
}): JSX.Element => {
  const handleChangeFavorite = (): void => {
    onChange(!isFavorite);
  };

  const modsButtonClasses = cn(style.favorite_button, className, {
    [style.product_variant]: variant === 'product',
    [style.product_card_variant]: variant === 'productCard',
  });

  return (
    <ButtonIcon className={modsButtonClasses} onClick={handleChangeFavorite}>
      <FavoriteAddedToIcon className={isFavorite ? style.active : ''} />
    </ButtonIcon>
  );
};
