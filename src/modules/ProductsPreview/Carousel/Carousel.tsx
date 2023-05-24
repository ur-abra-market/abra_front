import { FC, Children } from 'react';

import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import { CarouselProps } from 'modules/ProductsPreview/Carousel/Carousel.props';

export const Carousel: FC<CarouselProps> = props => {
  const { className, children, slideProps, ...restProps } = props;

  return (
    <Swiper className={cn(className)} {...restProps}>
      {children &&
        Children.map(children, child => {
          return <SwiperSlide {...slideProps}>{child}</SwiperSlide>;
        })}
    </Swiper>
  );
};
