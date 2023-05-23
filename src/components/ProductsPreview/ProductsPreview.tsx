import React, { FC, useCallback, useRef } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';

import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrow-slide-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/img/icons/arrow-slide-right.svg';
import { ButtonIcon } from '../../ui-kit';
import { Carousel } from '../Carousel/Carousel';

import style from './ProductsPreview.module.css';
import { ProductsPreviewProps } from './ProductsPreview.props';

const SPEED_TRANSITION = 1000;

export const ProductsPreview: FC<ProductsPreviewProps> = props => {
  const { className, title, href, children, ...restProps } = props;
  const swiperEl = useRef<SwiperType>();

  const handlePrev = useCallback((): void => {
    const startSlide = swiperEl.current?.isBeginning;

    if (startSlide) {
      return;
    }
    swiperEl.current?.slidePrev(SPEED_TRANSITION);
  }, []);

  const handleNext = useCallback((): void => {
    const endSlide = swiperEl.current?.isEnd;

    if (endSlide) {
      return;
    }
    swiperEl.current?.slideNext(SPEED_TRANSITION);
  }, []);

  const onBeforeInit = (swiper: SwiperType): void => {
    swiperEl.current = swiper;
  };

  return (
    <div className={cn(style.container, className)} {...restProps}>
      <div className={style.inner}>
        <div className={style.title_box}>
          <h2 className={style.title}>{title}</h2>
          {href && (
            <Link className={style.link} to={href}>
              See all
            </Link>
          )}
        </div>
        <div className={style.buttons}>
          <ButtonIcon>
            <ArrowLeft
              className={cn(style.icon_left, {
                [style.disable]: swiperEl.current?.isBeginning,
              })}
              onClick={handlePrev}
            />
          </ButtonIcon>
          <ButtonIcon onClick={handleNext}>
            <ArrowRight
              className={cn(style.icon_right, {
                [style.disable]: swiperEl.current?.isEnd,
              })}
              onClick={handleNext}
            />
          </ButtonIcon>
        </div>
      </div>
      <Carousel
        onBeforeInit={onBeforeInit}
        spaceBetween={11}
        slidesPerView="auto"
        slidesPerGroup={6}
        slideProps={{ style: { width: 220 } }}
      >
        {children}
      </Carousel>
    </div>
  );
};
