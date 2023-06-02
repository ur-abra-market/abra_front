import React, { useState } from 'react';

import cn from 'classnames';

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { status } from '../../../../store/reducers/productSlice';

import style from './StatusProduct.module.css';

export enum CategoryType {
  BESTSELLERS = 'bestsellers',
  NEW = 'new',
  RATING = 'rating',
  HOT = 'hot',
}

const STATUS_ARRAY = [
  { label: 'Bestsellers', value: CategoryType.BESTSELLERS },
  { label: 'New Arrivals', value: CategoryType.NEW },
  { label: 'Highest Rating', value: CategoryType.RATING },
  { label: 'Hot Deals', value: CategoryType.HOT },
];

export const StatusProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [indexActiveCategory, setIndexActiveCategory] = useState<number>(0);

  const handleCheck = (category: string, index: number): void => {
    setIndexActiveCategory(index);
    dispatch(status(category));
  };

  return (
    <>
      <div
        className={style.categories}
        style={{ gridTemplateColumns: `repeat(${STATUS_ARRAY.length}, 1fr)` }}
      >
        {STATUS_ARRAY.map(({ label, value }, index) => (
          <div className={style.item} key={value}>
            <button
              type="button"
              className={cn(style.button, {
                [style.btn_active]: index === indexActiveCategory,
              })}
              onClick={() => handleCheck(value, index)}
            >
              {label}
            </button>
          </div>
        ))}
      </div>
      <div className={style.border_line}>
        <div
          className={style.border_line_active}
          style={{
            transform: `translateX(${100 * indexActiveCategory}%)`,
            width: `${100 / STATUS_ARRAY.length}%`,
          }}
        />
      </div>
    </>
  );
};
