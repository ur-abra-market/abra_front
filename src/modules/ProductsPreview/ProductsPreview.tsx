import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';

import style from './ProductsPreview.module.scss';

import { Carousel } from '.';

import { ArrowIcon } from 'assets/icons'; // 24px
import { ButtonIcon } from 'ui-kit';

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
    <div ref={containerRef} className={cn(style.container, className)} {...restProps}>
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
            <ArrowIcon
              className={cn(style.icon_left, {
                [style.disable_button]: disableLeftArrow,
              })}
            />
          </ButtonIcon>

          <ButtonIcon disabled={disableRightArrow} onClick={handleNext}>
            <ArrowIcon
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
