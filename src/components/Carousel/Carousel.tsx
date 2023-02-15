import React, { FC, PropsWithChildren, useState } from 'react';

import style from './Carousel.module.css';

interface CarouselProps {
  title: string;
  widthSlider?: number;
  arrayLength: number;
}
export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  title,
  arrayLength,
  children,
  widthSlider = 1376,
}): JSX.Element => {
  const widthCart = 220;
  const gap = 11;
  const step = widthCart + gap;
  const widthList = arrayLength * widthCart + (arrayLength - 1) * gap;

  const dl = widthSlider - widthList;
  const [left, setLeft] = useState(0);

  const move = (d: number): void => {
    const newleft = left + d;
    // eslint-disable-next-line no-nested-ternary
    const dLeft = newleft > 0 ? 0 : newleft < dl ? dl : newleft;

    setLeft(dLeft);
  };

  return (
    <div className={style.slider}>
      <div className={style.slider__control}>
        {title && (
          <div className={style.slider__name}>
            <h2>{title}</h2>
          </div>
        )}
        <div className={style.slider__btn}>
          <div
            role="presentation"
            className={style.slider__btn_left}
            onClick={() => move(step)}
          />
          <div
            role="presentation"
            className={style.slider__btn_right}
            onClick={() => move(-step)}
          />
        </div>
      </div>
      <div className={style.slider__card}>
        <div className={style.slider__card_list} style={{ left: `${left}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
};
