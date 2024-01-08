import React, { FC } from 'react';

import { IRating } from 'elements/ProductFeedback/utils/calculationsRatings';

import style from './ReviewsIndicator.module.scss';

interface IReviewsIndicator {
  rating: IRating[];
}

const GRAY_LINE_RATING = 100;
const WITHOUT_RATING = 0;

export const ReviewsIndicator: FC<IReviewsIndicator> = ({ rating }): JSX.Element => {
  return (
    <div className={style.grade_indicators}>
      {rating.map(el => {
        const fillRating = GRAY_LINE_RATING - el.percent;
        const rating =
          el.percent === WITHOUT_RATING ? WITHOUT_RATING : GRAY_LINE_RATING - fillRating;

        return (
          <div key={el.rating} className={style.indicator_wrapper}>
            <span>{el.rating} Stars</span>
            <div className={style.reviews_container}>
              <div style={{ width: `${rating}%` }} className={style.red_line} />
            </div>
            <span>{el.totalRating}</span>
          </div>
        );
      })}
    </div>
  );
};
