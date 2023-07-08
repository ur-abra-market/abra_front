import React, { FC, useCallback, useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Thumbs } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

import style from './ProductCarousel.module.scss';

import { ArrowIcon } from 'assets/icons';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { IImage } from 'store/reducers/productSliceNew/interfaces';
import { Button } from 'ui-kit';

// eslint-disable-next-line import/order
import cn from 'classnames';

type Props = {
  photoArray: IImage[];
};

const minLength = 1;
const maxLength = 5;
const baseLength = 5;
const rowGap = 8;
const heightSlide = 106;

const imagesData = [
  {
    id: 1,
    image_url: 'https://picsum.photos/id/307/220/220',
    order: 1,
  },
  {
    id: 2,
    image_url: 'https://picsum.photos/id/247/220/220',
    order: 1,
  },
  {
    id: 3,
    image_url: 'https://placekitten.com/220/220?image=14',
    order: 1,
  },
  {
    id: 4,
    image_url: 'https://picsum.photos/id/475/220/220',
    order: 1,
  },
  {
    id: 6,
    image_url: 'https://picsum.photos/id/475/220/220',
    order: 1,
  },
  {
    id: 7,
    image_url: 'https://picsum.photos/id/475/220/220',
    order: 1,
  },
];

export const ProductCarousel: FC<Props> = ({ photoArray }) => {
  const [activeThumb, setActiveThumb] = useState<SwiperType | null>(null);
  const swiperEl = useRef<SwiperType>();

  const arrLength = imagesData.length;
  const slidesPerViewQuantity =
    arrLength >= minLength && arrLength < maxLength ? arrLength : baseLength;

  const sizeSlidersContainerPx = heightSlide * arrLength + rowGap * (arrLength - 1);
  const stylesSlidersContainer = {
    height: arrLength < 5 ? `${sizeSlidersContainerPx}px` : '562px',
  };

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
        {arrLength > minLength && (
          <Button color="white" onClick={handlePrev}>
            <ArrowIcon className={style.arrow_up} />
          </Button>
        )}

        <div className={style.images_container} style={stylesSlidersContainer}>
          <Swiper
            onBeforeInit={onBeforeInit}
            onSwiper={setActiveThumb}
            direction="vertical"
            slidesPerView={slidesPerViewQuantity}
            mousewheel={arrLength > minLength}
            allowTouchMove={false}
            className={style.swiper_container}
            modules={[Thumbs, Mousewheel]}
            slideToClickedSlide
            spaceBetween={8}
            loop
          >
            {imagesData.map((slide, index) => {
              return (
                <SwiperSlide key={`preview${index}`} className={style.image_slider}>
                  {({ isActive }) => (
                    <div
                      className={cn(style.preview_image, {
                        [style.active_slide]: isActive,
                      })}
                    >
                      <LazyImage src={slide.image_url} alt="" />
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {arrLength > minLength && (
          <Button color="white" onClick={handleNext}>
            <ArrowIcon />
          </Button>
        )}
      </div>

      <div className={style.image_container}>
        <Swiper
          allowTouchMove={arrLength > minLength}
          mousewheel={arrLength > minLength}
          className={style.swiper_container}
          thumbs={{ swiper: activeThumb }}
          modules={[Thumbs, Mousewheel]}
          direction="vertical"
          slidesPerView={1}
          spaceBetween={32}
          loop
        >
          {imagesData.map((slide, index) => {
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
