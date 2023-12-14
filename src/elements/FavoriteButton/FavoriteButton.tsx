import { FC, MouseEvent } from 'react';

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
  const handleChangeFavorite = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onChange(!isFavorite);
  };

  const buttonVariantClasses = cn(style.favorite_button, className, {
    [style.product_variant]: variant === 'product',
    [style.product_card_variant]: variant === 'productCard',
  });

  return (
    <ButtonIcon className={cn(style.favorite, className)} onClick={handleChangeFavorite}>
      <div className={buttonVariantClasses}>
        <FavoriteIcon className={isFavorite ? style.active : ''} />
      </div>
    </ButtonIcon>
  );
};
