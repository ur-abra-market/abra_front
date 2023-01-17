import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as LoupeIcon } from 'assets/img/icons/loupe.svg';
import { Carousel } from 'components/common';
import Flag from 'components/common/Flag';
import Stars from 'components/common/Stars';
import { getPriceOneItem } from 'pages/ProductPage/helpers/getPriceOneItem';
import style from 'pages/ProductPage/ProductPage.module.css';

export const PopularProduct = () => {
  const { popularProducts } = useSelector(state => state.popularProducts);

  if (!popularProducts) return null;

  const buildCarouselPopularProducts = () => {
    return (
      popularProducts &&
      popularProducts.map((data, index) => {
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
        } = data;

        return (
          <div className={style.card} key={`${id}-${index}`}>
            <div className={style.card__image}>
              <Flag className={style.card__flag} />
              <img src={image_url} alt={name} />
              <span className={style.card__hover}>
                <span className={style['card__hover-text']}>
                  <LoupeIcon />
                  <span>Quick View</span>
                </span>
              </span>
            </div>
            <Link to={`/product/${id}`} className={style.card__link}>
              <div className={style.card__direction}>
                <span>{name}</span>
                <span>{description}</span>
              </div>
            </Link>
            <div className={style.card__price}>
              <div className={style.amount}>
                {getPriceOneItem({ price_include_discount, min_quantity })}/pc
              </div>
              <span>{`/from ${min_quantity} pcs`}</span>
            </div>
            <Stars reward={parseFloat(grade_average) || 0} />
          </div>
        );
      })
    );
  };

  return (
    <Carousel
      title="Popular products in this category"
      arrayLength={popularProducts.length}
    >
      {buildCarouselPopularProducts()}
    </Carousel>
  );
};
