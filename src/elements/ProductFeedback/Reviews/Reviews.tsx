import React, { FC } from 'react';

import { useAppSelector } from 'common/hooks';
import { Grades } from 'elements/Grades/Grades';
import {
  calculatePercentRatings,
  calculationsRatings,
  countRatings,
} from 'elements/ProductFeedback/utils/calculationsRatings';
import { ReviewsIndicator } from 'pages/general-pages/ProductPage/ReviewsIndicator/ReviewsIndicator';
import { IFeedbacks } from 'store/reducers/productSlice/types';
import { Paragraph } from 'ui-kit';

import style from './Reviews.module.scss';

interface IReviews {
  hasFeedback: boolean;
  feedback: IFeedbacks;
}

export const Reviews: FC<IReviews> = ({ hasFeedback, feedback }): JSX.Element => {
  const totalReviews = countRatings(feedback);
  const averageReviews = calculationsRatings(feedback);
  const rating = calculatePercentRatings(feedback);

  return (
    <div>
      {hasFeedback ? (
        <div>
          <Grades
            className={style.grade}
            fiveStar
            variant="reviews"
            grade={averageReviews}
            count={totalReviews}
          />
          <ReviewsIndicator rating={rating} />
        </div>
      ) : (
        <Paragraph className={style.without_reviews} size="m" weight="medium">
          There are no reviews yet
        </Paragraph>
      )}
    </div>
  );
};
