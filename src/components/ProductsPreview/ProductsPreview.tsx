import React, { FC, useCallback, useRef, useState } from 'react';

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
  const [disableLeftArrow, setDisableLeftArrow] = useState(true);
  const [disableRightArrow, setDisableRightArrow] = useState(false);
  const handleInitialSlide = (): void => {
    if (swiperEl.current?.isEnd) {
      setDisableRightArrow(true);
    }
  };
  const handleChangeSlide = (): void => {
    if (swiperEl.current?.isBeginning) setDisableLeftArrow(true);
    else setDisableLeftArrow(false);
    if (swiperEl.current?.isEnd) setDisableRightArrow(true);
    else setDisableRightArrow(false);
  };
  const handlePrev = useCallback((): void => {
    swiperEl.current?.slidePrev(SPEED_TRANSITION);
  }, []);

  const handleNext = useCallback((): void => {
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
          <ButtonIcon disabled={disableLeftArrow} onClick={handlePrev}>
            <ArrowLeft
              className={cn(style.icon_left, {
                [style.disable_button]: swiperEl.current?.isBeginning,
              })}
            />
          </ButtonIcon>
          <ButtonIcon disabled={disableRightArrow} onClick={handleNext}>
            <ArrowRight
              className={cn(style.icon_right, {
                [style.disable_button]: swiperEl.current?.isEnd,
              })}
            />
          </ButtonIcon>
        </div>
      </div>
      <Carousel
        onAfterInit={handleInitialSlide}
        onBeforeInit={onBeforeInit}
        onSlideChange={handleChangeSlide}
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
