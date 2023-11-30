import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import { MagnifierLightGreyIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { FavoriteButton } from 'elements/FavoriteButton/FavoriteButton';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { userRoleSelector } from 'store/reducers/authSlice';
import { addFavoriteProduct, removeFavoriteProduct } from 'store/reducers/productSlice';

import style from './ProductImage.module.scss';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string;
  imageUrl: string;
  productId?: number;
  isFavorite: boolean;
}

const ProductImage: FC<IProductCard> = ({
  className,
  name,
  imageUrl,
  productId,
  isFavorite,
  ...restProps
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(userRoleSelector);

  const handleChangeFavorite = (isFavorite: boolean): void => {
    if (isFavorite) {
      dispatch(addFavoriteProduct({ product_id: Number(productId) }));
    } else {
      dispatch(removeFavoriteProduct({ product_id: Number(productId) }));
    }
  };

  return (
    <div className={cn(style.image_wrapper, className)} {...restProps}>
      {userRole && (
        <FavoriteButton
          isFavorite={isFavorite}
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
