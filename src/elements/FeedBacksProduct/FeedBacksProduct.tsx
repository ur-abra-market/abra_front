import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import {
  countEstimates,
  calculatePercentageEstimates,
  calculationsEstimates,
} from './utils/calculationsEstimates';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements/Grades/Grades';
import { ReviewsIndicator } from 'pages/general-pages/ProductPage/ReviewsIndicator/ReviewsIndicator';
import { HOME } from 'routes';
import { productGradeSelector } from 'store/reducers/productSlice';
import { Paragraph, Title } from 'ui-kit';

import style from './FeedBacksProduct.module.scss';

export const FeedBacksProduct = (): JSX.Element => {
  // todo c бекенда приходит одна цифра, но при пересчете получается другая
  const grade = useAppSelector(productGradeSelector);
  const feedBacksProduct = useAppSelector(state => state.product.feedbacks);

  const hasFeedBacks = Object.keys(feedBacksProduct).length !== 0;
  // todo не приходит общее кол-во оценок
  const totalReviews = countEstimates(feedBacksProduct);
  const averageReviews = calculationsEstimates(feedBacksProduct);
  const estimates = calculatePercentageEstimates(feedBacksProduct);

  return (
    <div className={cn(style.feedbacks_container, style.section)}>
      <div className={style.title_container}>
        <Title as="h3" className={style.title}>
          Feedbacks
        </Title>
        {hasFeedBacks && (
          <Link className={style.link} to={HOME}>
            See All
          </Link>
        )}
      </div>

      {hasFeedBacks ? (
        <div>
          <Grades
            className={style.grade}
            fiveStar
            variant="reviews"
            grade={averageReviews}
            count={totalReviews}
          />
          <div className={style.grade_indicators}>
            {hasFeedBacks &&
              estimates.map(el => (
                <ReviewsIndicator
                  key={el.estimate}
                  estimate={el.estimate}
                  lineFillPercentage={el.percentage}
                  total={el.totalEstimates}
                />
              ))}
          </div>
        </div>
      ) : (
        <Paragraph className={style.without_reviews} size="m" weight="medium">
          There are no reviews yet
        </Paragraph>
      )}
    </div>
  );
};
