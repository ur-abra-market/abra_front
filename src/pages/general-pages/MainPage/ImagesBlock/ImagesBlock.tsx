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
          type="default_image"
        >
          <div className={style.main_block}>
            <span className={style.main_block_text}>GLASSES</span>
            <span className={style.main_block_text}>$8.50/pc </span>
            <span className={style.main_block_text}>/from 100pcs</span>
          </div>
        </LazyImage>
      </div>

      <div className={style.container}>
        <div className={style.image_box_grid}>
          <div className={style.grid_item1}>
            <LazyImage
              src={Banner4Image}
              height={500}
              width={682}
              alt=""
              className={style.border_radius}
              type="default_image"
            >
              <span className={style.grid_item1_block}>AUTUMN SALE</span>
            </LazyImage>
          </div>

          <div className={style.grid_item2}>
            <LazyImage
              src={Banner5Image}
              height={244}
              width={682}
              alt=""
              className={style.border_radius}
              type="default_image"
            >
              <div className={style.grid_item2_block}>
                <span className={style.grid_item2_text}>special price for</span>
                <span className={style.grid_item2_text}>sneakers</span>
              </div>
            </LazyImage>
          </div>

          <div className={style.grid_item3}>
            <LazyImage
              src={Banner6Image}
              height={244}
              width={355}
              alt=""
              className={style.border_radius}
              type="default_image"
            >
              <span className={style.grid_item3_block}>MEN’S CLOTHES</span>
            </LazyImage>
          </div>

          <div className={style.grid_item4}>
            <LazyImage
              src={Banner7Image}
              height={244}
              width={355}
              alt=""
              className={style.border_radius}
              type="default_image"
            >
              <span className={style.grid_item4_block}>WOMEN’S CLOTHES</span>
            </LazyImage>
          </div>
        </div>
      </div>
    </div>
  );
};
