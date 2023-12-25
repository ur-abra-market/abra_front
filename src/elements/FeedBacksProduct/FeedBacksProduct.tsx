import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements/Grades/Grades';
import { ReviewsIndicator } from 'pages/general-pages/ProductPage/ReviewsIndicator/ReviewsIndicator';
import {
  productGradeSelector,
  productTotalOrdersSelector,
} from 'store/reducers/productSlice';
import { Title } from 'ui-kit';

import style from './FeedBacksProduct.module.scss';

export const FeedBacksProduct = (): JSX.Element => {
  const grade = useAppSelector(productGradeSelector);
  const totalOrders =
    useAppSelector(productTotalOrdersSelector) || (Math.random() * 10).toFixed(); // imitation

  return (
    <div className={cn(style.feedbacks_container, style.section)}>
      <div className={style.title_container}>
        <Title as="h3" className={style.title}>
          Feedbacks
        </Title>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className={style.link} to="#">
          See All
        </Link>
      </div>

      <div>
        <Grades
          className={style.grade}
          fiveStar
          variant="reviews"
          grade={grade}
          count={+totalOrders}
        />
        <div className={style.grade_indicators}>
          <div className={style.indicator_wrapper}>
            <span>5 Starts</span>
            <ReviewsIndicator />
            <span>9059</span>
          </div>
          <div className={style.indicator_wrapper}>
            <span>4 Stars</span>
            <ReviewsIndicator />
            <span>800</span>
          </div>
          <div className={style.indicator_wrapper}>
            <span>3 Stars</span>
            <ReviewsIndicator />
            <span>0</span>
          </div>
          <div className={style.indicator_wrapper}>
            <span>2 Stars</span>
            <ReviewsIndicator />
            <span>0</span>
          </div>
          <div className={style.indicator_wrapper}>
            <span>1 Star</span>
            <ReviewsIndicator />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
