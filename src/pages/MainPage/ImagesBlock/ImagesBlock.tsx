import React, { FC } from 'react';

import cn from 'classnames';

import bg_main from '../../../assets/img/test_img/main-bg.jpg';
import bg1 from '../../../assets/img/test_img/main_1.jpg';
import bg2 from '../../../assets/img/test_img/main_2.jpg';
import bg3 from '../../../assets/img/test_img/main_3.jpg';
import bg4 from '../../../assets/img/test_img/main_4.jpg';
import { Container } from '../../../components';

import style from './ImagesBlock.module.css';
import { ImagesBlockProps } from './ImagesBlock.props';

export const ImagesBlock: FC<ImagesBlockProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(style.images_box, className)} {...restProps}>
      <div className={style.image_box_main}>
        <img src={bg_main} alt="" />
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
            <img src={bg1} alt="" />
          </div>
          <div className={cn(style.grid_item2)}>
            <div className={style.grid_item_ad}>
              <span>special price for</span>
              <span>sneakers</span>
            </div>
            <img src={bg2} alt="" />
          </div>
          <div className={cn(style.grid_item3)}>
            <span className={style.grid_item_ad}>MEN’S CLOTHES</span>
            <img src={bg3} alt="" />
          </div>
          <div className={cn(style.grid_item4)}>
            <span className={style.grid_item_ad}>WOMEN’S CLOTHES</span>
            <img src={bg4} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};
