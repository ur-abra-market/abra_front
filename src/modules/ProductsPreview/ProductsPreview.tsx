import React, {
  DetailedHTMLProps,
  FC,
  KeyboardEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';

import { Carousel } from '.';

import { ArrowIcon } from 'assets/icons'; // 24px
import { ButtonIcon, Title } from 'ui-kit';

import style from './ProductsPreview.module.scss';

interface IProductsPreview
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  href?: string;
}
const SPEED_TRANSITION = 1000;

export const ProductsPreview: FC<IProductsPreview> = ({
  className,
  title,
  href,
  children,
  ...restProps
}) => {
  const swiperEl = useRef<SwiperType>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [disableLeftArrow, setDisableLeftArrow] = useState(true);
  const [disableRightArrow, setDisableRightArrow] = useState(false);

  const [cardsPerGroup, setCardsPerGroup] = useState(6);
  const [cardWidth, setCardWidth] = useState(220);
  const [cardsGap, setCardsGap] = useState(11);

  useEffect(() => {
    const handleCardsCountPerGroup = (): void => {
      let tempWidth = 220;
      let tempGap = 11;

      if (document.body.clientWidth <= 425) {
        tempWidth = 152;
        tempGap = 8;
      } else if (document.body.clientWidth <= 768) {
        tempWidth = 180;
      }

      const result = containerRef.current
        ? Math.floor((containerRef.current.clientWidth + tempGap) / (tempWidth + tempGap))
        : 6;

      setCardsPerGroup(result);
      setCardWidth(tempWidth);
      setCardsGap(tempGap);
    };

    window.addEventListener('resize', handleCardsCountPerGroup);
    handleCardsCountPerGroup();

    return () => {
      window.removeEventListener('resize', handleCardsCountPerGroup);
    };
  }, []);

  const handleDisableLastSlide = (): void => {
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

  const handleTransitionToPrevSlide = useCallback((): void => {
    swiperEl.current?.slidePrev(SPEED_TRANSITION);
  }, []);

  const handleTransitionToNextSlide = useCallback((): void => {
    swiperEl.current?.slideNext(SPEED_TRANSITION);
  }, []);

  const handleDisableFirstSlide = (swiper: SwiperType): void => {
    swiperEl.current = swiper;
  };

  const handleScrollToCenter = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === 'Tab') {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div ref={containerRef} className={cn(style.container, className)} {...restProps}>
      <div className={style.inner}>
        <div className={style.title_box}>
          <Title className={style.title}>{title}</Title>
          {href && (
            <Link className={style.link} to={href}>
              See all
            </Link>
          )}
        </div>
        <div className={style.buttons}>
          <ButtonIcon
            onKeyUp={handleScrollToCenter}
            disabled={disableLeftArrow}
            onClick={handleTransitionToPrevSlide}
          >
            <ArrowIcon
              className={cn(style.icon_left, {
                [style.disable_button]: disableLeftArrow,
              })}
            />
          </ButtonIcon>

          <ButtonIcon
            onKeyUp={handleScrollToCenter}
            disabled={disableRightArrow}
            onClick={handleTransitionToNextSlide}
          >
            <ArrowIcon
              className={cn(style.icon_right, {
                [style.disable_button]: swiperEl.current?.isEnd,
              })}
            />
          </ButtonIcon>
        </div>
      </div>

      <Carousel
        onAfterInit={handleDisableLastSlide}
        onBeforeInit={handleDisableFirstSlide}
        onSlideChange={handleChangeSlide}
        spaceBetween={cardsGap}
        slidesPerView="auto"
        slidesPerGroup={cardsPerGroup}
        slideProps={{ style: { width: cardWidth } }}
      >
        {children}
      </Carousel>
    </div>
  );
};
