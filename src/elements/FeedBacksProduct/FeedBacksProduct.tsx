import React from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements/Grades/Grades';
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
    <div className={style.feedbacks_container}>
      <div className={style.title_container}>
        <Title as="h3" className={style.title}>
          Feedbacks
        </Title>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className={style.link} to="#">
          See All
        </Link>
      </div>

      <Grades fiveStar variant="reviews" grade={grade} count={+totalOrders} />
    </div>
  );
};
