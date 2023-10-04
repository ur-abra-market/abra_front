import { FC } from 'react';

import cn from 'classnames';

import { FavoriteIcon } from 'assets/icons';
import { ButtonIcon } from 'ui-kit';

import style from './FavoriteButton.module.scss';

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

  const buttonVariantClasses = cn(style.favorite_button, className, {
    [style.product_variant]: variant === 'product',
    [style.product_card_variant]: variant === 'productCard',
  });

  return (
    <ButtonIcon className={buttonVariantClasses} onClick={handleChangeFavorite}>
      <FavoriteIcon className={isFavorite ? style.active : ''} />
    </ButtonIcon>
  );
};
