import React, { FC } from 'react';

import ProductItem from '../ProductItem/ProductItem';

import style from './ShopItem.module.css';

interface ShopItemProps {
  shopItem: any;
}
const ShopItem: FC<ShopItemProps> = ({ shopItem }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeStatusHandler = () => {};

  return (
    <div className={style.shop_item}>
      <div className={style.shop_item_header}>
        <div>
          <input
            type="checkbox"
            className={style.shop_item_header_checkbox}
            checked={shopItem.checked}
            onChange={changeStatusHandler}
          />
        </div>
        <div className={style.shop_item_header_star} />
        <div className={style.shop_item_header_rating}>{shopItem.rating}</div>
        <div>{shopItem.name}</div>
        <div className={style.shop_item_header_arrow_right} />
      </div>

      {shopItem.products.map((prodItem: any) => (
        <ProductItem key={prodItem.id} product={prodItem} />
      ))}

      <div className={style.shop_item_footer}>
        <span>Estimated delivery: {shopItem.delivery.date}</span>
        <div className={style.shop_item_footer_dot} />
        <span>Delivery method:&nbsp;</span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={style.shop_item_footer_method}>{shopItem.delivery.method}</a>
      </div>
    </div>
  );
};

export default ShopItem;
