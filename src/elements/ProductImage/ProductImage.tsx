import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import { MagnifierLightGreyIcon } from 'assets/icons';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import style from 'elements/ProductImage/ProductImage.module.scss';
import Flag from 'old-components/Flag';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isFavorite: boolean;
  name: string;
  imageUrl: string;
}

const ProductImage: FC<IProductCard> = ({
  className,
  isFavorite,
  name,
  imageUrl,
  ...restProps
}): JSX.Element => {
  return (
    <div className={cn(style.image_wrapper, className)} {...restProps}>
      <Flag className={style.flag} isFavorite={isFavorite} />
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
