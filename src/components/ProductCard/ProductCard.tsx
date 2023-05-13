import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { getPriceOneItem } from '../../pages/ProductPage/helpers/getPriceOneItem';
import Flag from '../Flag';
import Stars from '../Stars';

import style from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

import { ReactComponent as LoupeIcon } from 'assets/img/icons/loupe.svg';

interface Example extends ProductCardProps {
  image_url?: string;
}

export const ProductCard: FC<Example> = (props): JSX.Element => {
  const { product, className, image_url, ...restProps } = props;
  const {
    name,
    prices,
    description,
    id,
    grade_average,
    is_active, // before fix "is_favorite"
  } = product;
  let min_quantity;

  if (prices) {
    min_quantity = prices[0].min_quantity;
  }

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
        <div className={style.amount}>{getPriceOneItem({ prices })}/pc</div>
        <span>{`/from ${min_quantity} pcs`}</span>
      </div>
      <Stars reward={parseFloat(grade_average.toString()) || 0} />
    </div>
  );
};
