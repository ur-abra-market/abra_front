import React, { FC } from 'react';

import style from './ReviewsIndicator.module.scss';

interface IReviewsIndicator {
  estimate: number;
  lineFillPercentage: number;
  total: number;
}

const GRAY_LINE_PROGRESS = 100;
const WITHOUT_ESTIMATE = 0;

export const ReviewsIndicator: FC<IReviewsIndicator> = ({
  estimate,
  lineFillPercentage,
  total,
}): JSX.Element => {
  const fillRate = GRAY_LINE_PROGRESS - lineFillPercentage;
  const progress =
    lineFillPercentage === WITHOUT_ESTIMATE
      ? WITHOUT_ESTIMATE
      : GRAY_LINE_PROGRESS - fillRate;

  return (
    <div className={style.indicator_wrapper}>
      <span>{estimate} Stars</span>
      <div className={style.reviews_container}>
        <div style={{ width: `${progress}%` }} className={style.red_line} />
      </div>
      <span>{total}</span>
    </div>
  );
};
