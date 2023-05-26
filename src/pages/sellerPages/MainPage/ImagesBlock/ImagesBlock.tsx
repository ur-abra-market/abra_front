import { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from 'classnames';

import { Container } from 'ui-kit';
import style from './ImagesBlock.module.css';

import { Banner0Image, Banner4Image, Banner5Image, Banner6Image, Banner7Image } from 'assets/images';

export interface ImagesBlockProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ImagesBlock: FC<ImagesBlockProps> = ({
  className,
  ...restProps
}): JSX.Element => {
  return (
    <div className={cn(style.images_box, className)} {...restProps}>
      <div className={style.image_box_main}>
        <img src={Banner0Image} />
        <div className={style.grid_item_main_ad}>
          <span>GLASSES</span>
          <span>$8.50/pc </span>
          <span>/from 100pcs</span>
        </div>
      </div>

      <Container>
        <div className={style.images_box_grid}>
          <div className={cn(style.grid_item1)}>
            <span className={style.grid_item_ad}>AUTUMN SALE</span>
            <img src={Banner4Image} />
          </div>
          <div className={cn(style.grid_item2)}>
            <div className={style.grid_item_ad}>
              <span>special price for</span>
              <span>sneakers</span>
            </div>
            <img src={Banner5Image} />
          </div>
          <div className={cn(style.grid_item3)}>
            <span className={style.grid_item_ad}>MEN’S CLOTHES</span>
            <img src={Banner6Image} />
          </div>
          <div className={cn(style.grid_item4)}>
            <span className={style.grid_item_ad}>WOMEN’S CLOTHES</span>
            <img src={Banner7Image} />
          </div>
        </div>
      </Container>
    </div>
  );
};
