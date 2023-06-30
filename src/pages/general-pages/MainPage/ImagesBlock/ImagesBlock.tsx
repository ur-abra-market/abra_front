import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './ImagesBlock.module.scss';

import {
  Banner0Image,
  Banner4Image,
  Banner5Image,
  Banner6Image,
  Banner7Image,
} from 'assets/images';
import { LazyImage } from 'elements/LazyImage/LazyImage';

export interface ImagesBlockProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ImagesBlock: FC<ImagesBlockProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <div className={cn(style.images_box, className)} {...restProps}>
      <div className={style.image_box_main}>
        <LazyImage
          src={Banner0Image}
          height={388}
          width={1440}
          alt=""
          className={style.banner_img}
        >
          <div className={style.grid_item_main_ad}>
            <span className={style.grid_item_main_ad_text}>GLASSES</span>
            <span className={style.grid_item_main_ad_text}>$8.50/pc </span>
            <span className={style.grid_item_main_ad_text}>/from 100pcs</span>
          </div>
        </LazyImage>
      </div>

      <div className={style.container}>
        <div className={style.images_box_grid}>
          <div className={style.grid_item1}>
            <LazyImage
              src={Banner4Image}
              height={500}
              width={682}
              alt=""
              className={style.banner_img}
            >
              <span className={style.grid_item_ad1}>AUTUMN SALE</span>
            </LazyImage>
          </div>

          <div className={style.grid_item2}>
            <LazyImage
              src={Banner5Image}
              height={244}
              width={682}
              alt=""
              className={style.banner_img}
            >
              <div className={style.grid_item_ad2}>
                <span className={style.grid_item_ad2_text}>special price for</span>
                <span className={style.grid_item_ad2_text}>sneakers</span>
              </div>
            </LazyImage>
          </div>

          <div className={style.grid_item3}>
            <LazyImage
              src={Banner6Image}
              height={244}
              width={355}
              alt=""
              className={style.banner_img}
            >
              <span className={style.grid_item_ad3}>MEN’S CLOTHES</span>
            </LazyImage>
          </div>

          <div className={style.grid_item4}>
            <LazyImage
              src={Banner7Image}
              height={244}
              width={355}
              alt=""
              className={style.banner_img}
            >
              <span className={style.grid_item_ad4}>WOMEN’S CLOTHES</span>
            </LazyImage>
          </div>
        </div>
      </div>
    </div>
  );
};
