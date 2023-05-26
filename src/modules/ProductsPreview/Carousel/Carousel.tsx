import { FC, Children } from 'react';

import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperProps, SwiperSlideProps } from 'swiper/react/swiper-react';

interface ICarousel extends SwiperProps {
  slideProps?: SwiperSlideProps;
}

export const Carousel: FC<ICarousel> = props => {
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
