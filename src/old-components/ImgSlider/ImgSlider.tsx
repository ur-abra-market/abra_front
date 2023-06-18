import { FC, useState } from 'react';

import Flag from '../Flag';

import style from './ImgSlider.module.css';

import nonePng from 'assets/images/files/image-default.png';

interface ImgSliderProps {
  srcArr: any[];
}
const ImgSlider: FC<ImgSliderProps> = ({ srcArr }): JSX.Element => {
  // const photos = ['./assets/image/products/1.png', './assets/image/products/2.png', './assets/image/products/3.png', './assets/image/products/4.png']
  // const arrPhoto = [...photos.slice(-1), ...photos, photos[0]];
  const [slide, setSlide] = useState(0);
  const pos = 0 - slide * 100;
  const images = (): JSX.Element => {
    if (!Array.isArray(srcArr)) {
      return (
        <div className={style.img_slider_window_list} style={{ marginLeft: '0%' }}>
          <img
            className={style.img_slider_window_list_img}
            src={srcArr || nonePng}
            alt="img"
          />
        </div>
      );
    }

    return (
      <div className={style.img_slider_window_list} style={{ marginLeft: `${pos}%` }}>
        {srcArr.map((src, i) => (
          <img
            className={style.img_slider_window_list_img}
            key={`card_slide_${i}`}
            src={src === '$URL' ? './assets/images/files/image-default.png' : src}
            alt="img"
          />
        ))}
      </div>
    );
  };
  const control = (): JSX.Element => {
    if (Array.isArray(srcArr) && srcArr.length > 1) {
      return (
        <div className={style.img_slider_control}>
          {srcArr.map((_, i) => (
            <div
              role="presentation"
              className={style.img_slider_control_slide}
              key={`card_photo_${i}`}
              onClick={() => setSlide(i)}
              style={{ background: i === slide ? '#000000' : '#828282' }}
            />
          ))}
        </div>
      );
    }

    return <div className={style.img_slider_control} />;
  };

  return (
    <div className={style.img_slider}>
      <div className={style.img_slider_window}>
        <Flag />
        {images()}
      </div>
      {control()}
    </div>
  );
};

export default ImgSlider;
