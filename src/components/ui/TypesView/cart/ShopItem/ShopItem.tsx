import React from 'react';

import PropTypes from 'prop-types';

import ProductItem from '../ProductItem/ProductItem';

import style from './ShopItem.module.css';

const ShopItem = ({ shopItem }) => {
  const changeStatusHandler = () => {};

  return (
    <div className={style.shopItem}>
      <div className={style.shopItem__header}>
        <div>
          <input
            type="checkbox"
            className={style.shopItem__header_checkbox}
            checked={shopItem.checked}
            onChange={changeStatusHandler}
          />
        </div>
        <div className={style.shopItem__header_star} />
        <div className={style.shopItem__header_rating}>{shopItem.rating}</div>
        <div>{shopItem.name}</div>
        <div className={style.shopItem__header_arrowRight} />
      </div>

      {shopItem.products.map(prodItem => (
        <ProductItem key={prodItem.id} product={prodItem} />
      ))}

      <div className={style.shopItem__footer}>
        <span>Estimated delivery: {shopItem.delivery.date}</span>
        <div className={style.shopItem__footer_dot} />
        <span>Delivery method:&nbsp;</span>
        <a className={style.shopItem__footer_method}>{shopItem.delivery.method}</a>
      </div>
    </div>
  );
};

ShopItem.propTypes = {
  shopItem: PropTypes.object,
};

export default ShopItem;
