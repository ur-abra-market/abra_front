import React, { FC, SyntheticEvent, useState } from 'react';

import cn from 'classnames';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

import style from './ProductCarousel.module.scss';

import { ArrowIcon } from 'assets/icons';
import { UserDefaultProductImage } from 'assets/images';
import { IImage } from 'store/reducers/productSlice';

type Props = {
  photoArray: IImage[];
};

const minLength = 1;
const maxLength = 5;
const baseLength = 5;
const rowGap = 8;
const heightSlide = 106;

type ReturnType = {
  slidesPerViewQuantity: number;
  stylesSlidersContainer: object;
};

const getSecondSliderInfo = (arrLength: number): ReturnType => {
  const slidesPerViewQuantity =
    arrLength >= minLength && arrLength < maxLength ? arrLength : baseLength;

  const sizeSlidersContainerPx = heightSlide * arrLength + rowGap * (arrLength - 1);

  const stylesSlidersContainer = {
    height: arrLength < maxLength ? `${sizeSlidersContainerPx}px` : '562px',
  };

  return {
    slidesPerViewQuantity,
    stylesSlidersContainer,
  };
};

export const ProductCarousel: FC<Props> = ({ photoArray }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const arrLength = photoArray.length;
  const { stylesSlidersContainer, slidesPerViewQuantity } =
    getSecondSliderInfo(arrLength);

  const handlePrev = (): void => {
    thumbsSwiper?.slidePrev();
  };
  const handleNext = (): void => {
    thumbsSwiper?.slideNext();
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    newEvent.currentTarget.src = UserDefaultProductImage;
  };

  return (
    <div className={style.sliders_container}>
      <div className={style.swiper_second_wrapper}>
        {arrLength > minLength && (
          <button type="button" className={style.btn} onClick={handlePrev}>
            <ArrowIcon className={`${style.arrow} ${style.arrow_up}`} />
          </button>
        )}

        <Swiper
          direction="vertical"
          slidesPerView={slidesPerViewQuantity}
          spaceBetween={8}
          className={style.swiper_second}
          slideToClickedSlide
          mousewheel={arrLength !== minLength}
          allowTouchMove={false}
          style={stylesSlidersContainer}
          loop
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          modules={[Thumbs, Mousewheel]}
        >
          {photoArray.map((el, index) => {
            return (
              <SwiperSlide key={el.id} className={style.swiper_second_el}>
                {() => (
                  <img
                    className={cn(style.swiper_second_el, {
                      [style.active_swipe]: activeIndex === index,
                    })}
                    src={el.image_url}
                    alt=""
                    onError={handleImageError}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        {arrLength > minLength && (
          <button type="button" className={style.btn} onClick={handleNext}>
            <ArrowIcon className={style.arrow} />
          </button>
        )}
      </div>

      <div>
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={8}
          className={style.swiper_main}
          allowTouchMove={false}
          mousewheel={arrLength !== minLength}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Mousewheel]}
          loop
          onActiveIndexChange={s => {
            setActiveIndex(s.realIndex);
          }}
        >
          {photoArray.map(el => {
            return (
              <SwiperSlide key={el.id}>
                <img src={el.image_url} alt="" onError={handleImageError} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
