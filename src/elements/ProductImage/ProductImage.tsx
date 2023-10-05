import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';

import cn from 'classnames';

import { MagnifierLightGreyIcon } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { FavoriteButton } from 'elements/FavoriteButton/FavoriteButton';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { userRoleSelector } from 'store/reducers/authSlice';

import style from './ProductImage.module.scss';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isFavorite: boolean;
  name: string;
  imageUrl: string;
  productId?: number;
}

const ProductImage: FC<IProductCard> = ({
  className,
  name,
  imageUrl,
  ...restProps
}): JSX.Element => {
  const userRole = useAppSelector(userRoleSelector);
  // TODO add request to favorite (fake Data)
  const [fakeIsFavorite, setIsFakeFavorite] = useState(false);

  const handleChangeFavorite = (isFavorite: boolean): void => {
    setIsFakeFavorite(isFavorite);
  };

  return (
    <div className={cn(style.image_wrapper, className)} {...restProps}>
      {userRole && (
        <FavoriteButton
          isFavorite={fakeIsFavorite}
          onChange={handleChangeFavorite}
          className={style.flag}
        />
      )}
      <LazyImage
        src={imageUrl || ''}
        alt={name}
        className={style.image}
        type="product_image_user"
      />
      <div className={style.hover}>
        <div className={style.hover_text}>
          <MagnifierLightGreyIcon />
          <span>Quick View</span>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
