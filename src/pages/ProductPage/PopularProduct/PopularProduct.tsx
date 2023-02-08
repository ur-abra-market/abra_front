import React from 'react';

import { Carousel } from 'components';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../store/hooks';

import { ReactComponent as LoupeIcon } from 'assets/img/icons/loupe.svg';
import Flag from 'components/Flag';
import Stars from 'components/Stars';
import { getPriceOneItem } from 'pages/ProductPage/helpers/getPriceOneItem';
import style from 'pages/ProductPage/ProductPage.module.css';

export const PopularProduct = (): JSX.Element => {
  const { popularProducts } = useAppSelector(state => state.popularProducts);

  const buildCarouselPopularProducts = (): JSX.Element[] => {
    return (
      popularProducts &&
      popularProducts.map((data: any, index: number) => {
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
          // eslint-disable-next-line react/no-array-index-key
          <div className={style.card} key={index}>
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
      {popularProducts && buildCarouselPopularProducts()}
    </Carousel>
  );
};
