import React from 'react';

import style from './ReviewsIndicator.module.scss';

export const ReviewsIndicator = (): JSX.Element => {
  return (
    <div className={style.reviews_container}>
      <div className={style.red_line} />
      <div className={style.gray_line} />
    </div>
  );
};
