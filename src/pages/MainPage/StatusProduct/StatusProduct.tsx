import React, { useState } from 'react';

import cn from 'classnames';

import { useAppDispatch } from '../../../store/hooks';
import { status } from '../../../store/reducers/productSlice';

import style from './StatusProduct.module.css';

const STATUS_ARRAY = [
  { label: 'Bestsellers', value: 'bestsellers' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Highest Rating', value: 'rating' },
  { label: 'Hot Deals', value: 'hot' },
  { label: 'Popular now', value: 'popular' },
];
const StatusProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [indexActiveCategory, setIndexActiveCategory] = useState<number>(0);

  const handleCheck = (category: string, index: number): void => {
    setIndexActiveCategory(index);
    dispatch(status(category));
  };

  return (
    <>
      <div className={style.categories}>
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
          style={{ transform: `translateX(${100 * indexActiveCategory}%)` }}
        />
      </div>
    </>
  );
};

export default StatusProduct;
