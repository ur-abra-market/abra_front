import React, { MouseEvent, useRef, useState } from 'react';

import cn from 'classnames';

import style from './StatusProduct.module.scss';

import { useAppDispatch } from 'common/hooks';
import { status } from 'store/reducers/productSliceOld';

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
  const ref = useRef<HTMLDivElement>(null);
  const [indexActiveCategory, setIndexActiveCategory] = useState<number>(0);
  const [initMousePosition, setInitMousePosition] = useState(-1);
  const [lastScrollLeft, setLastScrollLeft] = useState(0);

  const categoriesClasses = cn(style.categories, {
    [style.grab]: ref.current?.scrollWidth !== ref.current?.clientWidth,
    [style.grabbing]: initMousePosition !== -1,
  });

  const handleCheckCategory = (category: string, index: number): void => {
    setIndexActiveCategory(index);
    dispatch(status(category));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    setInitMousePosition(e.clientX);
  };

  const handleMouseUp = (): void => {
    setInitMousePosition(-1);
    setLastScrollLeft(ref.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (initMousePosition !== -1 && ref.current) {
      const currentMousePosition = e.clientX;

      ref.current.scrollLeft = lastScrollLeft + initMousePosition - currentMousePosition;
    }
  };

  return (
    <div
      ref={ref}
      onMouseDownCapture={handleMouseDown}
      onMouseUpCapture={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={categoriesClasses}
      style={{ gridTemplateColumns: `repeat(${STATUS_ARRAY.length}, 1fr)` }}
    >
      {STATUS_ARRAY.map(({ label, value }, index) => (
        <div className={style.item} key={value}>
          <button
            type="button"
            className={cn(style.button, {
              [style.btn_active]: index === indexActiveCategory,
            })}
            onClick={() => handleCheckCategory(value, index)}
          >
            {label}
          </button>
        </div>
      ))}

      <div
        className={style.border_line}
        style={{
          gridColumn: `1 / span ${STATUS_ARRAY.length}`,
        }}
      >
        <div
          className={style.border_line_active}
          style={{
            transform: `translateX(${100 * indexActiveCategory}%)`,
            width: `${100 / STATUS_ARRAY.length}%`,
          }}
        />
      </div>
    </div>
  );
};
