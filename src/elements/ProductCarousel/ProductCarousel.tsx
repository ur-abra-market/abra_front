import React, { FC, SyntheticEvent, useEffect, useState } from 'react';

import cn from 'classnames';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowIcon } from 'assets/icons';
import { UserDefaultProductImage } from 'assets/images';
import { IImage } from 'store/reducers/productSlice';
import { ButtonIcon } from 'ui-kit';

// eslint-disable-next-line import/order
import style from './ProductCarousel.module.scss';
import 'swiper/swiper-bundle.min.css';

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
        height: arrLength < maxLength ? `${sizeSlidersContainerPx}px` : '600px',
      }
    : {
        height: arrLength < maxLength ? `${sizeSlidersContainerPx}px` : '106px',
        width: '240px',
        // marginLeft: '0',
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
  const slidesPerView =
    arrLength >= minLength && arrLength < maxLength ? arrLength : baseLength;
  const { isVertical } = useGetSecondSliderInfo(arrLength);

  const prevSlide = (): void => {
    thumbsSwiper?.slidePrev();
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  const nextSlide = (): void => {
    thumbsSwiper?.slideNext();
    if (activeIndex < arrLength - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    newEvent.currentTarget.src = UserDefaultProductImage;
  };

  return (
    <div className={style.sliders_container}>
      <div className={style.swiper_second_wrapper}>
        {arrLength > maxLength && (
          <ButtonIcon
            disabled={activeIndex === 0}
            className={`${style.btn} ${activeIndex === 0 ? style.disabled : ''}`}
            onClick={prevSlide}
          >
            <ArrowIcon
              className={cn(style.arrow, style.arrow_up, {
                [style.rotate_first]: !isVertical,
              })}
            />
          </ButtonIcon>
        )}

        <Swiper
          slidesPerView={
            arrLength >= minLength && arrLength < maxLength ? arrLength : baseLength
          }
          spaceBetween={8}
          className={style.swiper_second}
          slideToClickedSlide
          mousewheel={arrLength !== minLength}
          allowTouchMove={false}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          modules={[Thumbs, Mousewheel]}
          breakpoints={{
            320: {
              direction: 'horizontal',
              slidesPerView: arrLength === 1 ? 1 : 2,
            },
            801: {
              direction: 'vertical',
              slidesPerView,
              height: slidesPerView * (heightSlide + rowGap),
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

        {arrLength > maxLength && (
          <ButtonIcon
            disabled={activeIndex === arrLength - 1}
            className={`${style.btn} ${
              activeIndex === arrLength - 1 ? style.disabled : ''
            }`}
            onClick={nextSlide}
          >
            <ArrowIcon
              className={cn(style.arrow, { [style.rotate_second]: !isVertical })}
            />
          </ButtonIcon>
        )}
      </div>

      <div className={style.swiper_main_container}>
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={8}
          className={style.swiper_main}
          allowTouchMove={false}
          mousewheel={arrLength !== minLength}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Mousewheel]}
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
