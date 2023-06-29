import React, { DetailedHTMLProps, FC, HTMLAttributes, SyntheticEvent } from 'react';

import cn from 'classnames';

import { MagnifierLightGreyIcon } from 'assets/icons';
import { DefaultProductImage } from 'assets/images';
import style from 'elements/ProductCard/ProductCard.module.scss';
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
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    newEvent.currentTarget.src = DefaultProductImage;
  };

  return (
    <div className={cn(style.image, className)} {...restProps}>
      <Flag className={style.flag} isFavorite={isFavorite} />
      <img src={imageUrl || ''} alt={name} onError={handleImageError} />
      <span className={style.hover}>
        <span className={style.hover_text}>
          <MagnifierLightGreyIcon />
          <span>Quick View</span>
        </span>
      </span>
    </div>
  );
};

export default ProductImage;
