import { SwiperProps, SwiperSlideProps } from 'swiper/react/swiper-react';

export interface CarouselProps extends SwiperProps {
  slideProps?: SwiperSlideProps;
  handleSlideChange: () => void;
}
