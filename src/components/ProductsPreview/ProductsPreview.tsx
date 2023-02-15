import React, { FC, useCallback, useRef } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';

import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrow-slide-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/img/icons/arrow-slide-right.svg';
import { Carousel } from '../ui-kit/Carousel/Carousel';
import { IconButton } from '../ui-kit/IconButton/IconButton';

import style from './ProductsPreview.module.css';
import { ProductsPreviewProps } from './ProductsPreview.props';

export const ProductsPreview: FC<ProductsPreviewProps> = props => {
  const { className, title, href = '/', children, ...restProps } = props;
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
    <div className={cn(style.container, className)} {...restProps}>
      <div className={style.inner}>
        <div className={style.title_box}>
          <h2 className={style.title}>{title}</h2>
          <Link className={style.link} to={href}>
            See all
          </Link>
        </div>
        <div className={style.buttons}>
          <IconButton>
            <ArrowLeft className={style.icon_left} onClick={handlePrev} />
          </IconButton>
          <IconButton>
            <ArrowRight className={style.icon_right} onClick={handleNext} />
          </IconButton>
        </div>
      </div>
      <Carousel
        onBeforeInit={onBeforeInit}
        spaceBetween={11}
        slidesPerView="auto"
        slideProps={{ style: { width: 220 } }}
      >
        {children}
      </Carousel>
    </div>
  );
};
