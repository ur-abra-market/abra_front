import React, { FC } from 'react';

import { ReactComponent as ArrowRight } from '../../../../../assets/img/icons/arrow-right.svg'; // 5 10px
import { ReactComponent as Dot } from '../../../../../assets/img/icons/dot.svg';
import { ReactComponent as Star } from '../../../../../assets/img/icons/star-empty.svg';
import { Checkbox } from '../../../../../ui-kit';
import ProductItem from '../ProductItem/ProductItem';

import style from './ShopItem.module.css';

interface ShopItemProps {
  shopItem: any;
}

const ShopItem: FC<ShopItemProps> = ({ shopItem }) => {
  const changeStatusHandler = (): void => {};

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Checkbox
          className={style.checkbox}
          checked={shopItem.checked}
          onChange={changeStatusHandler}
        />
        <Star className={style.star} />
        <div className={style.rating}>{shopItem.rating}</div>
        <div>{shopItem.name}</div>
        <ArrowRight className={style.arrow_right} />
      </div>

      {shopItem.products.map((prodItem: any) => (
        <ProductItem key={prodItem.id} product={prodItem} />
      ))}

      <div className={style.footer}>
        <span>Estimated delivery: {shopItem.delivery.date}</span>
        <Dot className={style.dot} />
        <span>Delivery method:&nbsp;</span>
        <a href="/#" className={style.method}>
          {shopItem.delivery.method}
        </a>
      </div>
    </div>
  );
};

export default ShopItem;
