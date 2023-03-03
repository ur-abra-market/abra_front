import React, { FC } from 'react';

import PropTypes from 'prop-types';

import style from './ProductItem.module.css';

interface ProductItemProps {
  product: any;
}
const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const changeQuantityHandler = () => {};

  const changeStatusHandler = () => {};

  return (
    <div className={style.productItem}>
      <div className={style.productItem__mainContainer}>
        <div>
          <input
            className={style.productItem__mainContainer_checkbox}
            checked={product.checked}
            onChange={changeStatusHandler}
            type="checkbox"
          />
        </div>

        <div>
          <img
            className={style.productItem__mainContainer_img}
            src="./assets/image/none.png"
            alt="img"
          />
        </div>

        <div>
          <p className={style.productItem__mainContainer_name}>{product.name}</p>
          <div className={style.productItem__mainContainer_info}>
            <div>Color: {product.color}</div>
            <div>Size: {product.size}</div>
            <div>Quantity: {product.quantity}</div>
          </div>
          <div className={style.productItem__mainContainer_price}>
            <p>${product.price}</p>
            <p className={style.productItem__mainContainer_priceSpecial}>
              Special offer: ≥ 200 = 1pc/$4.25
            </p>
          </div>
        </div>
      </div>

      <div className={style.productItem__quantityContainer}>
        <div className={style.productItem__quantityContainer_title}>
          Quantity
          <span className={style.productItem__quantityContainer_titleFrom}>
            /from {product.minQuantity} pcs
          </span>
        </div>
        <div className={style.productItem__quantityContainer_quantity}>
          <button className={style.productItem__quantityContainer_button}>-</button>
          <input
            className={style.productItem__quantityContainer_input}
            value={product.quantity}
            onChange={changeQuantityHandler}
            type="text"
          />
          <button className={style.productItem__quantityContainer_button}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
