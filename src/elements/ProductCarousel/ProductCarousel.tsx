import React, { FC, useCallback, useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

import style from './ProductCarousel.module.scss';

import { ArrowDownIcon, ArrowUpIcon } from 'assets/icons'; // 24px
import { Button } from 'ui-kit';

const ProductCarousel: FC<Props> = props => {
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
    <section className={style.slider}>
      <div className={style.flex_container}>
        <div className={style.col}>
          <Button color="white" onClick={handlePrev}>
            <ArrowUpIcon />
          </Button>

          <div className={style.thumbs}>
            <Swiper
              onBeforeInit={onBeforeInit}
              onSwiper={setActiveThumb}
              direction="vertical"
              spaceBetween={10}
              slidesPerView="auto"
              loop
              className={style.swiper_container1}
              modules={[Thumbs]}
            >
              {photoArray.map((slide, index) => {
                return (
                  <SwiperSlide key={`preview${index}`} style={{ height: 106 }}>
                    <div className={style.preview_image}>
                      <img src={slide} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <Button color="white" onClick={handleNext}>
            <ArrowDownIcon />
          </Button>
        </div>

        <div className={style.images}>
          <Swiper
            thumbs={{ swiper: activeThumb }}
            direction="vertical"
            slidesPerView={1}
            spaceBetween={32}
            mousewheel
            className={style.swiper_container2}
            modules={[Thumbs, Mousewheel]}
          >
            {photoArray.map((slide, index) => {
              return (
                <SwiperSlide key={`image${index}`}>
                  <div className={style.slider_showed}>
                    <img src={slide} alt="" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;

type Props = {
  photoArray: string[];
};
