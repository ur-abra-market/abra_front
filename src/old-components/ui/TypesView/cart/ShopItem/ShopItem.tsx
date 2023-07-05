import { FC } from 'react';

import style from './ShopItem.module.scss';

import { ArrowIcon, DotIcon, StarEmptyIcon } from 'assets/icons'; // 5 10px for ArrowRightIcon
import ProductItem from 'old-components/ui/TypesView/cart/ProductItem/ProductItem';
import { Checkbox } from 'ui-kit';

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
        <StarEmptyIcon className={style.star} />
        <div className={style.rating}>{shopItem.rating}</div>
        <div>{shopItem.name}</div>
        <ArrowIcon className={style.arrow_right} />
      </div>

      {shopItem.products.map((prodItem: any) => (
        <ProductItem key={prodItem.id} product={prodItem} />
      ))}

      <div className={style.footer}>
        <span>Estimated delivery: {shopItem.delivery.date}</span>
        <DotIcon className={style.dot} />
        <span>Delivery method:&nbsp;</span>
        <a href="/#" className={style.method}>
          {shopItem.delivery.method}
        </a>
      </div>
    </div>
  );
};

export default ShopItem;
