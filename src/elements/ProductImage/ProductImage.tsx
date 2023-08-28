import { DetailedHTMLProps, FC, HTMLAttributes, KeyboardEvent, useState } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import style from './ProductImage.module.scss';

import { MagnifierLightGreyIcon } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { FavoriteButton } from 'elements/FavoriteButton/FavoriteButton';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { PRODUCT_DETAILS } from 'routes';
import { userRoleSelector } from 'store/reducers/authSlice';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isFavorite: boolean;
  name: string;
  imageUrl: string;
  productId?: number;
}

const ProductImage: FC<IProductCard> = ({
  className,
  isFavorite,
  name,
  imageUrl,
  productId,
  ...restProps
}): JSX.Element => {
  const navigate = useNavigate();
  const userRole = useAppSelector(userRoleSelector);
  // TODO add request to favorite (fake Data)
  const [fakeIsFavorite, setIsFakeFavorite] = useState(false);

  const navigateToProductPage = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') navigate(`${PRODUCT_DETAILS}/${productId}`);
  };

  const handleChangeFavorite = (isFavorite: boolean): void => {
    setIsFakeFavorite(isFavorite);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onKeyDown={navigateToProductPage}
      className={cn(style.image_wrapper, className)}
      {...restProps}
    >
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
