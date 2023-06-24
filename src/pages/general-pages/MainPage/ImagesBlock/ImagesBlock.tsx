import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import {
  Banner0Image,
  Banner4Image,
  Banner5Image,
  Banner6Image,
  Banner7Image,
} from '../../../../assets/images';

import style from './ImagesBlock.module.scss';

export interface ImagesBlockProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ImagesBlock: FC<ImagesBlockProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <div className={cn(style.images_box, className)} {...restProps}>
      <div className={style.image_box_main}>
        <img
          className={style.banner_img}
          src={Banner0Image}
          alt=""
          height={388}
          width={1440}
        />
        <div className={style.grid_item_main_ad}>
          <span className={style.grid_item_main_ad_text}>GLASSES</span>
          <span className={style.grid_item_main_ad_text}>$8.50/pc </span>
          <span className={style.grid_item_main_ad_text}>/from 100pcs</span>
        </div>
      </div>

      <div className={style.container}>
        <div className={style.images_box_grid}>
          <div className={style.grid_item1}>
            <span className={style.grid_item_ad1}>AUTUMN SALE</span>
            <img
              className={style.banner_img}
              src={Banner4Image}
              alt=""
              height={500}
              width={682}
            />
          </div>

          <div className={style.grid_item2}>
            <div className={style.grid_item_ad2}>
              <span className={style.grid_item_ad2_text}>special price for</span>
              <span className={style.grid_item_ad2_text}>sneakers</span>
            </div>
            <img
              className={style.banner_img}
              src={Banner5Image}
              alt=""
              height={244}
              width={682}
            />
          </div>

          <div className={style.grid_item3}>
            <span className={style.grid_item_ad3}>MEN’S CLOTHES</span>
            <img
              className={style.banner_img}
              src={Banner6Image}
              alt=""
              height={244}
              width={355}
            />
          </div>

          <div className={style.grid_item4}>
            <span className={style.grid_item_ad4}>WOMEN’S CLOTHES</span>
            <img
              className={style.banner_img}
              src={Banner7Image}
              alt=""
              height={244}
              width={355}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
