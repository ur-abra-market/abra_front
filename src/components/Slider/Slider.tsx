import React, { FC, useState } from 'react';

import Card from '../Card';

import style from './Slider.module.css';

interface SliderProps {
  title: string;
  products: any[];
}
const Slider: FC<SliderProps> = ({ title, products }): JSX.Element => {
  const widthCart = 220;
  const gap = 11;
  const step = widthCart + gap;
  const widthList = products.length * widthCart + (products.length - 1) * gap;
  const widthSlider = 1376;
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
        <div className={style.slider__name}>
          <h2>{title}</h2>
          <span>See all</span>
        </div>
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
          {products.map(product => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
