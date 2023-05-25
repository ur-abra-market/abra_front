import React, { DetailedHTMLProps, FC, HTMLAttributes, SyntheticEvent } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import NoneImage from '../../assets/img/icons/none.png';
import Flag from '../../old-components/Flag';
import { getPriceOneItem } from '../../pages/sellerPages/ProductPage/helpers/getPriceOneItem';
import { IProductCompilation } from '../../services/product/product.serviceTypes';
import { Stars } from '../../ui-kit';

import style from './ProductCard.module.scss';

import { ReactComponent as LoupeIcon } from 'assets/img/icons/loupe.svg';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
}

export const ProductCard: FC<IProductCard> = ({
  product,
  className,
  ...restProps
}): JSX.Element => {
  const { name, prices, description, images, id, grade_average, is_active } = product;
  const { min_quantity } = prices[0];
  const image_url = images[0]?.image_url;
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    newEvent.currentTarget.src = NoneImage;
  };

  return (
    <div className={cn(style.card, className)} {...restProps}>
      <div className={style.image}>
        <Flag className={style.flag} isFavorite={is_active} />
        <img src={image_url || ''} alt={name} onError={handleImageError} />
        <span className={style.hover}>
          <span className={style.hover_text}>
            <LoupeIcon />
            <span>Quick View</span>
          </span>
        </span>
      </div>
      <Link to={`/product/${id}`} className={style.link}>
        <div className={style.direction}>
          <span>{name}</span>
          <span>{description}</span>
        </div>
      </Link>
      <div className={style.price}>
        <div className={style.amount}>{getPriceOneItem(prices)}/pc</div>
        <span>{`/from ${min_quantity} pcs`}</span>
      </div>
      <Stars reward={grade_average || 0} />
    </div>
  );
};
