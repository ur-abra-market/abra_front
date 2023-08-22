import React, { DetailedHTMLProps, FC, HTMLAttributes, KeyboardEvent } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { MagnifierLightGreyIcon } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import style from 'elements/ProductImage/ProductImage.module.scss';
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

  const handleLinkClick = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') navigate(`${PRODUCT_DETAILS}/${productId}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onKeyDown={handleLinkClick}
      className={cn(style.image_wrapper, className)}
      {...restProps}
    >
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
