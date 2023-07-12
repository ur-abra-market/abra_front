import React, { FC, useState } from 'react';

import cn from 'classnames';

import style from './ProductsListSettings.module.scss';

import { AddNewProduct, RecentlyDeleted } from 'assets/icons';

enum ActiveList {
  ALL_PRODUCTS = 'all products',
  ON_SALE = 'on sale',
  OFF_SALE = 'off sale',
}

export const ProductsListSettings: FC = (): JSX.Element => {
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.ALL_PRODUCTS);

  const setAll = (): void => {
    setActiveList(ActiveList.ALL_PRODUCTS);
  };
  const setOnSale = (): void => {
    setActiveList(ActiveList.ON_SALE);
  };
  const setOffSale = (): void => {
    setActiveList(ActiveList.OFF_SALE);
  };

  const allProductsClasses = cn(style.filter, {
    [style.active]: activeList === ActiveList.ALL_PRODUCTS,
  });
  const onSaleClasses = cn(style.filter, {
    [style.active]: activeList === ActiveList.ON_SALE,
  });
  const offSaleClasses = cn(style.filter, {
    [style.active]: activeList === ActiveList.OFF_SALE,
  });

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <span className={allProductsClasses} onClick={setAll} role="presentation">
          All Products
        </span>
        <span className={onSaleClasses} onClick={setOnSale} role="presentation">
          On-sale
        </span>
        <span className={offSaleClasses} onClick={setOffSale} role="presentation">
          Off-sale
        </span>
      </div>

      <div className={style.wrapper}>
        <div className={style.inner}>
          <AddNewProduct />
          <span className={style.add_and_removed}>Add a new product</span>
        </div>
        <div className={style.inner}>
          <RecentlyDeleted />
          <span className={style.addAndRemoved}>Recently deleted</span>
        </div>
      </div>
    </div>
  );
};
