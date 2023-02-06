import React, { FC, useState } from 'react';

import PropTypes from 'prop-types';

import nonePng from '../../assets/img/icons/none.png';
import Flag from '../Flag';

import style from './ImgSlider.module.css';

interface ImgSliderProps {
  srcArr: any[];
}
const ImgSlider: FC<ImgSliderProps> = ({ srcArr }): JSX.Element => {
  // const photos = ['./assets/image/products/1.png', './assets/image/products/2.png', './assets/image/products/3.png', './assets/image/products/4.png']
  // const arrPhoto = [...photos.slice(-1), ...photos, photos[0]];
  const [slide, setSlide] = useState(0);
  const pos = 0 - slide * 100;
  const images = () => {
    if (!Array.isArray(srcArr)) {
      return (
        <div className={style.imgSlider__window_list} style={{ marginLeft: '0%' }}>
          <img
            className={style.imgSlider__window_list_img}
            src={srcArr || nonePng}
            alt="img"
          />
        </div>
      );
    }

    return (
      <div className={style.imgSlider__window_list} style={{ marginLeft: `${pos}%` }}>
        {srcArr.map((src, i) => (
          <img
            className={style.imgSlider__window_list_img}
            key={`card_slide_${i}`}
            src={src === '$URL' ? './assets/image/none.png' : src}
            alt="img"
          />
        ))}
      </div>
    );
  };
  const control = (): JSX.Element => {
    if (Array.isArray(srcArr) && srcArr.length > 1) {
      return (
        <div className={style.imgSlider_control}>
          {srcArr.map((_, i) => (
            <div
              className={style.imgSlider_control_slide}
              key={`card_photo_${i}`}
              onClick={() => setSlide(i)}
              style={{ background: i === slide ? '#000000' : '#828282' }}
            />
          ))}
        </div>
      );
    }

    return <div className={style.imgSlider_control} />;
  };

  return (
    <div className={style.imgSlider}>
      <div className={style.imgSlider__window}>
        <Flag />
        {images()}
      </div>
      {control()}
    </div>
  );
};

export default ImgSlider;
