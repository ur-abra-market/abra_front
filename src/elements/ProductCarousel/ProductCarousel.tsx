import React, { FC, SyntheticEvent, useEffect, useState } from 'react';

import cn from 'classnames';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowIcon } from 'assets/icons';
import { UserDefaultProductImage } from 'assets/images';
import { IImage } from 'store/reducers/productSlice';

import 'swiper/swiper-bundle.min.css';
// eslint-disable-next-line import/order
import style from './ProductCarousel.module.scss';

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
  isVertical: boolean;
};

const useGetSecondSliderInfo = (arrLength: number): ReturnType => {
  const [isVertical, setIsVertical] = useState(true);

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 801) {
        setIsVertical(true); // Переключаем на горизонтальный режим
      } else {
        setIsVertical(false); // Переключаем на вертикальный режим
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем при загрузке страницы

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const slidesPerViewQuantity =
    arrLength >= minLength && arrLength < maxLength ? arrLength : baseLength;

  const sizeSlidersContainerPx = heightSlide * arrLength + rowGap * (arrLength - 1);

  const stylesSlidersContainer = isVertical
    ? {
        height: arrLength < maxLength ? `${sizeSlidersContainerPx}px` : '567px',
      }
    : {
        height: arrLength < maxLength ? `${sizeSlidersContainerPx}px` : '106px',
        width: '567px',
      };

  return {
    isVertical,
    slidesPerViewQuantity,
    stylesSlidersContainer,
  };
};

export const ProductCarousel: FC<Props> = ({ photoArray }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const arrLength = photoArray.length;
  const { stylesSlidersContainer, slidesPerViewQuantity, isVertical } =
    useGetSecondSliderInfo(arrLength);

  const prevSlide = (): void => {
    thumbsSwiper?.slidePrev();
  };
  const nextSlide = (): void => {
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
          <button type="button" className={style.btn} onClick={prevSlide}>
            <ArrowIcon
              className={cn(style.arrow, style.arrow_up, {
                [style.rotate_first]: !isVertical,
              })}
            />
          </button>
        )}

        <Swiper
          direction="horizontal"
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
          breakpoints={{
            321: {
              slidesPerView: 3,
            },
            800: {
              direction: 'vertical',
            },
          }}
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
          <button type="button" className={cn(style.btn)} onClick={nextSlide}>
            <ArrowIcon
              className={cn(style.arrow, { [style.rotate_second]: !isVertical })}
            />
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
