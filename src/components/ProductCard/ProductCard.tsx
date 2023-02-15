import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { getPriceOneItem } from '../../pages/ProductPage/helpers/getPriceOneItem';
import style from '../../pages/ProductPage/ProductPage.module.css';
import Flag from '../Flag';
import Stars from '../Stars';

import { ProductCardProps } from './ProductCard.props';

import { ReactComponent as LoupeIcon } from 'assets/img/icons/loupe.svg';

export const ProductCard: FC<ProductCardProps> = (props): JSX.Element => {
  const { product, className, ...restProps } = props;
  const {
    name,
    price_include_discount,
    // total_orders,
    image_url,
    // supplier_id,
    description,
    id,
    min_quantity,
    grade_average,
  } = product;

  return (
    <div className={cn(style.card, className)} {...restProps}>
      <div className={style.image}>
        <Flag className={style.flag} />
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
        <div className={style.amount}>
          {getPriceOneItem({ price_include_discount, min_quantity })}/pc
        </div>
        <span>{`/from ${min_quantity} pcs`}</span>
      </div>
      <Stars reward={parseFloat(grade_average) || 0} />
    </div>
  );
};
