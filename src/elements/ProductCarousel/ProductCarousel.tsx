import React, { FC, useCallback, useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

import style from './ProductCarousel.module.scss';

import { ArrowIcon } from 'assets/icons'; // 24px
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { IImage } from 'store/reducers/productSliceNew/interfaces';
import { Button } from 'ui-kit';

type Props = {
  photoArray: IImage[];
};

export const ProductCarousel: FC<Props> = props => {
  const { photoArray } = props;

  const [activeThumb, setActiveThumb] = useState<SwiperType | null>(null);

  const swiperEl = useRef<SwiperType>();

  const handlePrev = useCallback((): void => {
    swiperEl.current?.slidePrev();
  }, []);

  const handleNext = useCallback((): void => {
    swiperEl.current?.slideNext();
  }, []);

  const onBeforeInit = (swiper: SwiperType): void => {
    if (!swiper) return;
    swiperEl.current = swiper;
  };

  return (
    <div className={style.slider_container}>
      <div className={style.images_slider}>
        <Button color="white" onClick={handlePrev}>
          <ArrowIcon className={style.arrow_up} />
        </Button>

        <div className={style.images_container}>
          <Swiper
            onBeforeInit={onBeforeInit}
            onSwiper={setActiveThumb}
            direction="vertical"
            spaceBetween={8}
            slidesPerView="auto"
            loop
            className={style.swiper_container}
            modules={[Thumbs]}
          >
            {photoArray.map((slide, index) => {
              return (
                <SwiperSlide key={`preview${index}`} className={style.image_slider}>
                  <div className={style.preview_image}>
                    <LazyImage src={slide.image_url} alt="" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <Button color="white" onClick={handleNext}>
          <ArrowIcon />
        </Button>
      </div>

      <div className={style.image_container}>
        <Swiper
          thumbs={{ swiper: activeThumb }}
          direction="vertical"
          slidesPerView={1}
          spaceBetween={32}
          mousewheel
          className={style.swiper_container}
          modules={[Thumbs, Mousewheel]}
        >
          {photoArray.map((slide, index) => {
            return (
              <SwiperSlide key={`image${index}`}>
                <div className={style.slider_showed}>
                  <LazyImage src={slide.image_url} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
