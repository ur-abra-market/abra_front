import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import Flag from '../../old-components/Flag';
import { getPriceOneItem } from '../../pages/sellerPages/ProductPage/helpers/getPriceOneItem';
import { Stars } from '../../ui-kit';

import style from './ProductCard.module.css';
import { IProductCard } from './ProductCard.props';

import { ReactComponent as LoupeIcon } from 'assets/img/icons/magnifier-light-grey.svg';

export const ProductCard: FC<IProductCard> = ({
  product,
  className,
  ...restProps
}): JSX.Element => {
  const { name, prices, description, images, id, grade_average, is_active } = product;
  const { min_quantity } = prices[0];
  const image_url = images[0]?.image_url;

  return (
    <div className={cn(style.card, className)} {...restProps}>
      <div className={style.image}>
        <Flag className={style.flag} isFavorite={is_active} />
        <img src={image_url || ''} alt={name} />
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
