import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Card from '../Card';

import style from './Slider.module.css';

const Slider = ({ title, products }) => {
  const widthCart = 220;
  const gap = 11;
  const step = widthCart + gap;
  const widthList = products.length * widthCart + (products.length - 1) * gap;
  const widthSlider = 1376;
  const dl = widthSlider - widthList;
  const [left, setLeft] = useState(0);

  const move = d => {
    const newleft = left + d;
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
          <div className={style.slider__btn_left} onClick={() => move(step)} />
          <div className={style.slider__btn_right} onClick={() => move(-step)} />
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

Slider.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
};
export default Slider;
